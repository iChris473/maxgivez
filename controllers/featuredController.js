
const Product = require("../models/Featured")

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
    const { cat, price, page } = req.query

    try {
        const allProducts = await Product.find({});

        if(cat && !price){
            const filteredProducts = allProducts.filter(p => p.category.toLowerCase() == cat.toLowerCase())
            return res.status(200).json(filteredProducts)
        }

        if(price && !cat){
             if(price.toLowerCase() == "cheap"){
                const filteredProducts = allProducts.filter(p => p.price < 5000)
                return res.status(200).json(filteredProducts)
             } else if(price.toLowerCase() == "afford"){
                const filteredProducts = allProducts.filter(p => p.price > 5000 && p.price < 10000)
                return res.status(200).json(filteredProducts)
             }
              else {
                const filteredProducts = allProducts.filter(p => p.price > 10000)
                return res.status(200).json(filteredProducts)
             }
        }

        if(price && cat){
            if(price.toLowerCase() == "cheap"){
                const filteredProducts = allProducts.filter(p => p.category.toLowerCase() == cat.toLowerCase() && p.price < 5000)
                return res.status(200).json(filteredProducts)
            } else if(price.toLowerCase() == "afford"){
                const filteredProducts = allProducts.filter(p => p.category.toLowerCase() == cat.toLowerCase() && (p.price > 5000 && p.price < 10000))
                return res.status(200).json(filteredProducts)
             } else {
                const filteredProducts = allProducts.filter(p => p.category.toLowerCase() == cat.toLowerCase() && p.price > 10000)
                return res.status(200).json(filteredProducts)
             }
        }
        // const page = parseInt(page) || 1
        // const pageSize = parseInt(limit) || 3
        // const skip = (page - 1) * pageSize
        // const total = await User.countDocuments()
        // const pages = Math.ceil( total / pageSize )
        // query = query.skip(skip).limit(pageSize)
        // const results = await query

        // if(page > pages) {
        //     return res.status(404).json('page not found')
        // }

        // res.status(200).json({
        //     count: results.length,
        //     page,
        //     pages,
        //     data: results
        // })
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
        res.status(200).json(product) 
    } catch (error) {
        res.status(401).json(error)  
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.query.id);
        res.status(200).json("Product deleted") 
    } catch (error) {
        res.status(404).json(error)  
    }
}