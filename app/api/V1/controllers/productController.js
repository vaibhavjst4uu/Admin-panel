const db = require("../../../models/index");
const { Op } = require("sequelize");

const getProducts = async (req, res) => {
  try {
    const { page = 1, pageSize = 10, tag_id, category, brand, keyword } = req.query;
    const offset = (page - 1) * pageSize;
    // Split the keyword into individual terms
    const keywords = keyword.split(' ');

    // Define additional conditions based on filters
    const whereConditions = {};
    if (category) {
      whereConditions.categoryId = category;
    }
    if (brand) {
      whereConditions.brandId = brand;
    }
      // Search for brand name separately
      // Search for brand name separately
    //   const brandData = await db.Brands.findAll({
    //     where: {
    //       [Op.or]: keywords.map(k => ({
    //         name: { [Op.like]: `%${k}%` },
    //       })),
    //     },
    //   });

    //   console.log(brandData.length);
    // // Add brandId to whereConditions if brandData is found
    // if (brandData.length > 0) {
    //     whereConditions.brandId = {
    //       [Op.in]: brandData.map(brand => brand.id),
    //     };
    //     console.log(whereConditions.brandId);
    //   }
    

    // Add keyword search condition for both product name and brand name
    // if (keyword) {
    //     whereConditions[Op.or] = keywords.map(k => ({
    //       [Op.or]: [
    //         { name: { [Op.like]: `%${k}%` } },
    //         { description: { [Op.like]: `%${k}%` } },
    //       ],
    //     }));
    // }
    console.log(whereConditions);

    const includeClause = tag_id
    ? [
        {
          model: db.Tags,
          where: {
            id: tag_id,
          },
          required: true,
        },
      ]
    : [];

    // console.log(brandData);
    // res.json(whereConditions);
      
    const products = await db.Products.findAndCountAll({
      include: tag_id ? includeClause:db.Tags,
      limit: parseInt(pageSize),
      offset: offset,
      where: whereConditions, // Apply other filters here
    });

    const totalPages = Math.ceil(products.count / pageSize);

    res.json({
      status: "success",
      responseCode: 200,
      data: {
        products: products.rows,
        currentPage: parseInt(page),
        totalPages: totalPages,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const searchProducts = async (req, res) => {
    try {
      const { keyword } = req.body;
      const keywords = keyword.split(' ');
        // console.log(keywords);
        const products = await db.Products.findAll({
            where: {
              [Op.or]: [
                ...keywords.map(k => ({ name: { [Op.like]: `%${k}%` } })),
                { description: { [Op.like]: `%${keyword}%` } },
              ],
            },
          });
      
          res.json({
            status: "success",
            responseCode: 200,
            data: {
              products: products,
            },
          });
 
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

const detailedProductInformation = async(req,res)=>{
try {
    const id=Number(req.params.id);
    const product = await db.Products.findOne({
        where:{
            id : id
        },
        include: [
            { model: db.product_images },
            { model: db.product_quantity },
            { model: db.product_price, as: "product_prices" },
            { model: db.product_has_tags, as: "productTags" },
          ],
    });

    const brand = await db.Brands.findOne({
        where:{
            id:product.brandId
        },
        attributes:['name']
    });

    const category = await db.Categories.findOne({
        where:{
            id:product.categoryId
        },
        attributes:['name']
    });
  
    res.json({product:product, brand:brand, category:category});
} catch (error) {
    console.error(error);
    res.json(error);
}
}  
  
module.exports = {
  getProducts,
  searchProducts,
  detailedProductInformation
};
