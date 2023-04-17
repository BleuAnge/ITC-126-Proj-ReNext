migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lfm2qjqbnc78yee")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nb5o8q5z",
    "name": "user_id",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 1,
      "max": 100,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lfm2qjqbnc78yee")

  // remove
  collection.schema.removeField("nb5o8q5z")

  return dao.saveCollection(collection)
})
