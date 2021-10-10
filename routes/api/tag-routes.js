const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
   try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, ProductTag }],
    });
    res.status(200).json(tagData)
  } catch(err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, ProductTag }],
    });

    if (!tagData){
      res.status(404).json({ message: 'No Tag with that id' })
    }
    res.status(200).json(tagData)
  } catch(err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try{
    
    const updatedTag = await Tag.update(
    {
      category_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(updatedTag);
  } catch(err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  try{
    const deleteTag = await Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
  res.status(200).json(deleteTag);
    }catch(err) {
      res.json(err)
    }
});

module.exports = router;
