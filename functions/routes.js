const { Router } = require("express");
const router = Router()
const admin = require("firebase-admin");
const db = admin.firestore();

// Create
router.post("/products", async (req, res) => {
  try {
    await db
      .collection("products")
      .doc("/" + req.body.id + "/")
      .create({ name: req.body.name });
    return res.status(200).json();
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get("/products/:id", (req, res) => {
  (async () => {
    try {
      const doc = db.collection("products").doc(req.params.id );
      const item = await doc.get();
      const response = item.data();
      return res.status(200).send(response);
    } catch (error) {
      return res.status(500).send(error);
    }
  })();
});

router.get("/products", async (req, res) => {
  try {
    let query = db.collection("products");
    const querySnapshot = await query.get();
    let docs = querySnapshot.docs;

    const response = docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
    }));

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.put("/products/:id", async (req, res) => {
  try {
    const document = db.collection("products").doc(req.params.id);
    await document.update({
      name: req.body.name,
    });
    return res.status(200).json();
  } catch (error) {
    return res.status(500).json();
  }
});

router.delete("/products/:id", async (req, res) => {
  try {
    const doc = db.collection("products").doc(req.params.id);
    await doc.delete();
    return res.status(200).json();
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router; 