const db = require("../models/index");
const { Op } = require("sequelize");
const { FileUpload, DeleteFile } = require("../middlewares/uploadFiles");
let Products = db.Products;
let Categories = db.Categories;
let Brands = db.Brands;
let Tags = db.Tags;
let Media = db.media;


//my code
// const addProduct = async (req, res) => {
// try {
//     // console.log(req.files.featuredImage);
//     let featuredImage = await FileUpload(
//       req.files.featuredImage,
//       "app/uploads/featuredImages/"
//     );
//     const otherImages = [];
//     for (const imageFile of req.files.otherImages) {
//       const result = await FileUpload(imageFile, "app/uploads/otherImages/");
//       result.uploadedBy = uploadedBy;
//       otherImages.push(result);
//     }

//     featuredImage.uploadedBy = uploadedBy;
//     const addFeaturedMedia = await Media.create(featuredImage);
//     const addOtherMedia = await Media.bulkCreate([...otherImages]);

//     const{ name, description, price, brandId, categoryId, quantity, tags, status} = req.body;

//     const newProduct =await Products.create({
//       name: name,
//       description:description,
//       createdBy:1,
//       status: status,
//       brandId: brandId,
//       categoryId: categoryId,
//     });

//     const addProductImages = await product_images.create({
//       productId: newProduct.id,
//       mediaId: addFeaturedMedia.id,
//       isFeatured: 1,
//     });

//     const addOtherImages = await product_images.bulkCreate([
//       ...addOtherMedia.map((img) => ({ productId: newProduct.id, mediaId: img.id })),
//     ]);

//     const addProductQuantity = await product_quantity.create({
//       productId : newProduct.id ,
//       quantity : quantity,
//       createdBy: 1
//     });

//     let addProductPrice = await product_price.create({
//       productId : newProduct.id ,
//       price:price,
//       createdBy:1
//     });
//     console.log(tags);
//     const addProductTags = await product_has_tags.bulkCreate(
//       tags.map((tag) => ({ productId: newProduct.id, tagId: tag }))
//     );

//     console.log(req.body);

//     res.json(req.body);
// } catch (error) {
//     res.json(error);
// }
// };

const addProduct = async (req, res) => {
  let DeleteImg = [];
  try {
    const {
      name,
      description,
      price,
      brandId,
      categoryId,
      quantity,
      tags,
      status,
    } = req.body;

    //Create Media instances
    let featuredImage = await FileUpload(
      req.files.featuredImage,
      "app/uploads/featuredImages/"
    );
    const otherImages = [];
    for (const imageFile of req.files.otherImages) {
      const result = await FileUpload(imageFile, "app/uploads/otherImages/");
      result.uploadedBy = req.session.userId;
      otherImages.push(result);
    }
    featuredImage.uploadedBy = req.session.userId;
    // console.log(otherImages);

    DeleteImg.push(featuredImage);
    DeleteImg.push(...otherImages);

    const result = await db.sequelize.transaction(async (t) => {
      const addFeaturedMedia = await Media.create(featuredImage, {
        transaction: t,
      });
      const addOtherMedia = await Media.bulkCreate([...otherImages], {
        transaction: t,
      });

      // Create product and associate with Media, product_quantity, product_price, product_has_tags
      const newProduct = await db.Products.create(
        {
          name: name,
          description: description,
          createdBy: req.session.UserId,
          status: status,
          brandId: brandId,
          categoryId: categoryId,
          product_images: [
            {
              mediaId: addFeaturedMedia.id,
              isFeatured: true,
            },
            ...otherImages.map((media, index) => ({
              mediaId: addOtherMedia[index].id,
            })),
          ],
          product_quantity: {
            quantity: quantity,
            createdBy: req.session.userId,
          },
          product_prices: [
            {
              price: price,
              createdBy: req.session.userId,
            },
          ],
          productTags: tags.map((tag) => ({ tagId: tag })),
        },
        {
          include: [
            { model: db.product_images },
            { model: db.product_quantity },
            { model: db.product_price, as: "product_prices" },
            { model: db.product_has_tags, as: "productTags" },
          ],
          transaction: t,
        },
        { transaction: t }
      );
      return newProduct;
    });

    req.flash("error", "true");
    // res.json(result);
    res.redirect("/product/data");
  } catch (error) {
    // console.log(DeleteImg);
    for (let img of DeleteImg) {
      await DeleteFile(img.filepath);
    }
    console.error(error);
    req.flash("error", "false");
    res.redirect("/product/data");
  }
};

const findAll = async (req, res) => {
  try {
    const data = await Products.findAll({
      include: [
        { model: db.product_quantity },
        { model: db.Tags },
        {
          model: db.product_images,

          where: { isFeatured: 1 },
        },
        {
          model: db.product_price,
          as: "product_prices",
          where: { status: 1 },
        },
        // Include other associated tables here if any
      ],
    });
    if (!data) {
      throw new Error("no product data found");
    }

    // console.log(data);
    // res.json(data);
    const brands = await Brands.findAll();
    const categories = await Categories.findAll();
    const tags = await Tags.findAll();
    // res.json({brands});
    const errorRes = req.flash("error");
    res.render("productData", { data, brands, categories, tags, errorRes });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      err,
    });
  }
};

const deleteProduct = async (req, res) => {
  const id = Number(req.params.id);

  let productImg = await db.product_images.findAll({
    where: { productId: id },
  });
  for (let media of productImg) {
    let data = await db.media.findOne({
      where: { id: media.mediaId },
      attributes: ["filepath"],
    });
    await DeleteFile(data.filepath);
    await db.media.destroy({ where: { id: media.mediaId } });
  }

  await db.product_has_tags.destroy({ where: { productId: id } });
  await Products.destroy({
    where: {
      id: id,
    },
  });

  res.redirect("/product/data");
};

const updateProduct = async (req, res) => {
  try {
    const {

      name,
      description,
      price,
      brandId,
      categoryId,
      quantity,
      tags,
      status,
    } = req.body;

    const result = await db.sequelize.transaction(async (t) => {

      // Find the existing product
      const productId = Number(req.params.id);
      const existingProduct = await db.Products.findByPk(productId, {
        transaction: t,
      });

      // Update product details
      existingProduct.name = name;
      existingProduct.description = description;
      existingProduct.status = status;
      existingProduct.brandId = brandId;
      existingProduct.categoryId = categoryId;
      existingProduct.updatedBy = req.session.userId;

      // Save the changes
      await existingProduct.save({ transaction: t });
      await db.product_quantity.update({quantity:quantity,},{
        where:{
          productId:productId
        },
        transaction: t,
      });

      await db.product_price.update({price:price,},{
        where:{
          productId:productId,
        },
        transaction: t
      });
      tags.forEach(async(tag)=>{
        await db.product_has_tags.findOrCreate({
          where: {
            productId: productId,
            tagId: tag,
          },
          defaults: {
            productId: productId,
            tagId: tag,
          },
          transaction: t
        })
      });

      await db.product_has_tags.destroy({
        where:{
          productId:productId,
          tagId:{
            [Op.not]: [...tags],
          },
        },
        transaction: t
      })


      return existingProduct;
    });

    req.flash("error", "update");
    res.redirect("/product/data");
  } catch (error) {
    console.log(error);
    req.flash("error", "notUpdate");
    res.redirect("/product/data");
  }
};

module.exports = {
  findAll,
  addProduct,
  deleteProduct,
  updateProduct,
};
