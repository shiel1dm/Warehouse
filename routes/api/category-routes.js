const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const cataData = await Category.findAll({
      include: [
        { 
          model: Product,
          attributes: ['id','product_name','price','stock','category_id'] 
        }
      ],
    });
    console.log(cataData)
    res.status(200).json(cataData)
  } catch(err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  try {
    const cataData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!cataData){
      res.status(404).json({ message: 'No category with that id' })
    }
    res.status(200).json(cataData)
  } catch(err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  try {
    const cataData = await Category.create(req.body);
    res.status(200).json(cataData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try{
    
    const updatedCat = await Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(updatedCat);
  } catch(err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  try{
    const deleteCat = await Category.destroy({
    where: {
      id: req.params.id,
    },
  })
  res.status(200).json(deleteCat);
    }catch(err) {
      res.json(err)
    }
});

module.exports = router;
