migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3flntferfckbdwh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9re1rkhz",
    "name": "application_isNew",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3flntferfckbdwh")

  // remove
  collection.schema.removeField("9re1rkhz")

  return dao.saveCollection(collection)
})
