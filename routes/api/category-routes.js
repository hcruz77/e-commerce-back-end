const router = require('express').Router();
const { Category, Product} = require('../../models');

// The `/api/categories` endpoint
// find all categories
  
 // be sure to include its associated Products
router.get('/', async (req, res) => {
  try {
    const userData = await Category.findAll({
      include: [{model: Product}],     
    });                             
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find one category by its `id` value
// be sure to include its associated Products  
router.get('/:id', async (req, res) => {
  try {
    const userData = await Category.findbyPK(req.params.id, {
      include: [{ model: Product }],                      
    });  
    if (!userData) {
      res.status(404).json({ message: 'No category with this id' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
  
});
// create a new category
router.post('/',async (req, res) => {
  const userData = await Category.create(req.body);

  return res.json(userData);
  
});

// update a category by its `id` value
router.put('/:category_id', async (req, res) => {
  const userData = await Category.update(
    {
      category_name: req.body.category_name,
  },
  {
    where: {
      category_id: req.params.category_id,
    },
  }
  );
  return res.json(userData);
});
  
 // delete a category by its `id` value
router.delete('/:category_id', async (req, res) => {
  const userData = await Category.destroy({
    where: {
      category_id: req.params.category_id,
    },
  });
  return res.json(userData);
});

module.exports = router;
