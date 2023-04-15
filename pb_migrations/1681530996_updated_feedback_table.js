migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lfm2qjqbnc78yee")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hzcfdkul",
    "name": "feedback_status",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lfm2qjqbnc78yee")

  // remove
  collection.schema.removeField("hzcfdkul")

  return dao.saveCollection(collection)
})
