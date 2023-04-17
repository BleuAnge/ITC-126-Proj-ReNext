migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a2evll9ad55jzc6")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qqvlbwrl",
    "name": "usertype",
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
  const collection = dao.findCollectionByNameOrId("a2evll9ad55jzc6")

  // remove
  collection.schema.removeField("qqvlbwrl")

  return dao.saveCollection(collection)
})
