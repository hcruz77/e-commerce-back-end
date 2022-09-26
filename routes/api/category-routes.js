const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// find all categories

// be sure to include its associated Products
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find one category by its `id` value
// be sure to include its associated Products  
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findbyPK(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category with this id' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }

});
// create a new category
router.post('/', async (req, res) => {
  const categoryData = await Category.create(req.body);
  res.json(categoryData);
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  const categoryData = await Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        category_id: req.params.category_id,
      },
    }
  );
  return res.json(categoryData);
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  const categoryData = await Category.destroy({
    where: {
      id: req.params.id
    }
  })
  res.json(categoryData);
});


module.exports = router;
