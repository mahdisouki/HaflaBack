const commandeController = require("../controllers/commandeController");

router.post("/commandes", commandeController.createCommande);
router.get("/commandes", commandeController.getCommandes);
router.get("/commandes/:id", commandeController.getCommandeById);
router.put("/commandes/:id", commandeController.updateCommande);
router.delete("/commandes/:id", commandeController.deleteCommande);
module.exports = router;
