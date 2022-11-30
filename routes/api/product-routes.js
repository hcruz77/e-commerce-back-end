const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
// find all products
// be sure to include its associated Category and Tag data
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [{ model: Category }, { model: Tag , through: ProductTag }],
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// get one product
router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findOne(req.params.product_id, {
      include: [{ model: Category }, { model: Tag , through: ProductTag }],
    });
    if (!productData) {
      res.status(404).json({ message: 'No product with this id' });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }

});

// create new product
router.post('/', async (req, res) => {
  /* req.body should look like this...
  {
    "product_name": "Basketball",
    "price": 200.00,
    "stock": 3,
    "tagIds": [1, 2, 3, 4]
  }
  */
  try {
    const product = await Product.create(req.body);
    // if there's product tags, we need to create pairings to bulk create in the ProductTag model
    if (req.body.tagIds.length) {
      await product.setTags(req.body.tagIds);
      await product.save();
      const productTags = await product.getTags();
      return res.status(200).json(productTags);
    }
    // if no product tags, just respond
    return res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

// update product
router.put('/:id', async (req, res) => {
  try {
    // update product data
    await Product.update(req.body, { where: {product_id: req.params.id } });
    const product = await Product.findByPk(req.params.id);
    if (req.body.tagIds.length) {
      await product.setTags(req.body.tagIds);
      await product.save();
      await product.getTags();
      const productTags = await product.getTags();
      return res.status(200).json(productTags);
    }
    await product.save();
    return res.json(product);
  } catch (err) {
     console.log(err)
    return res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  const productData = await Product.destroy({
    where: {
      product_id: req.params.id
    }
  })
  res.json(productData);
});


module.exports = router;
