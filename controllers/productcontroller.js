
const Product = require("../models/Product")

exports.createProduct = async (req, res) => {
    const newProduct = new Product(req.body)
    try {
        await newProduct.save()
        res.status(201).json(newProduct)
    } catch (error) {
        res.status(400).status(error)
    }

}

exports.getOneProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
    } catch (error) {
        res.status(404).json(error)
    }
}

exports.getProducts = async (req, res) => {

    const { cat, page, plat } = req.query

    try {

        const allProducts = await Product.find({});

        if(cat){
            const filteredProducts = allProducts.filter(p => p.category.toLowerCase() == cat.toLowerCase())
            return res.status(200).json(filteredProducts)
        }

        if(plat != 'all'){
            const filteredProducts = allProducts.filter(p => p.platform.toLowerCase() == plat.toLowerCase())
            return res.status(200).json(filteredProducts)
        }

        return res.status(200).json(allProducts)
        
    } catch (err) {
        return res.status(400).json(err)
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.query.id, {
                $set: req.body
            },{new: true}
        );
        return res.status(200).json(product) 
    } catch (error) {
        return res.status(401).json(error)  
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.query.id);
        return res.status(200).json("Product deleted") 
    } catch (error) {
       return  res.status(404).json(error)  
    }
}

exports.getRecommendation = async (req, res) => {

    try {
        
        const recommeds = await Product.find({category: req.query.cat})
        return res.status(200).json(recommeds) 

    } catch (error) {
        return res.status(400).json("An error occured while trying to get recommendationns")
    }
    
}