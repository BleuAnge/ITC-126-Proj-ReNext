migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3flntferfckbdwh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "932yfeqq",
    "name": "application_status",
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
  const collection = dao.findCollectionByNameOrId("3flntferfckbdwh")

  // remove
  collection.schema.removeField("932yfeqq")

  return dao.saveCollection(collection)
})
