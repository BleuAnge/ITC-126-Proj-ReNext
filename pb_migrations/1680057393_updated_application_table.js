migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3flntferfckbdwh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "akyasevm",
    "name": "last_name",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 10,
      "max": 100,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wlryfqrs",
    "name": "email",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 10,
      "max": 1000,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3flntferfckbdwh")

  // remove
  collection.schema.removeField("akyasevm")

  // remove
  collection.schema.removeField("wlryfqrs")

  return dao.saveCollection(collection)
})
