migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3flntferfckbdwh")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "okndqyus",
    "name": "first_name",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 2,
      "max": 100,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3flntferfckbdwh")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "okndqyus",
    "name": "first_name",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 10,
      "max": 100,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
