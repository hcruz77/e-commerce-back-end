const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags
// be sure to include its associated Product data
router.get('/', async (req, res) => {
  const tagData = await Tag.findAll({
    include: [{ model: Product }, { model: ProductTag }],
  });
  res.json(tagData);
});

// find a single tag by its `id`
// be sure to include its associated Product data
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }, { model: ProductTag }],
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag with this id' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// create a new tag
router.post('/', async (req, res) => {
  const tagData = await Tag.create.apply(req.body);
  res.json(tagData);
});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  const tagData = await Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        tag_id: req.params.tag_id,
      },
    }
  );
  return res.json(tagData);
});

// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  const tagData = await tag.destroy({
    where: {
      id: req.params.id
    }
  })
  res.json(tagData);
});

module.exports = router;

