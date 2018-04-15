module.exports = app => {
  const {ID, SHORT_RELATED_ID, TITLE, PRICE, DESCRIPTION, CONTENT, STOCK, UNIT, PICTURES} = app.$model.columns

  return app.$model.define('products', {
    id: ID,
    category_id: SHORT_RELATED_ID,
    title: TITLE,
    price: PRICE,
    description: DESCRIPTION,
    content: CONTENT,
    stock: STOCK,
    unit: UNIT,
    pictures: PICTURES
  })
}
