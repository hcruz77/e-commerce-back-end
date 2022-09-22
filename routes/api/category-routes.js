const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// find all categories
  

router.get('/', async (req, res) => {
  try {
    const userData = await Category.findAll(); // be sure to include its associated Products
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find one category by its `id` value
  
router.get('/:id', async (req, res) => {
  try {
    const userData = await Category.findbyPK(req.params.id); // be sure to include its associated Products
    if (!userData) {
      res.status(404).json({ message: 'No category with this id' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
  
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
