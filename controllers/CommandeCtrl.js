const Commande = require("../models/commande");
const Service = require("../models/service");
const Offer = require("../models/offer");
const Solde = require("../models/solde");
exports.createCommande = async (req, res) => {
    try {
        const commande = new Commande(req.body);
        await commande.save();

        // Update solde for each service
        for (let offerId of commande.offers) {
            const offer = await Offer.findById(offerId).populate('service');
            if (offer && offer.service) {
                const service = await Service.findById(offer.service._id).populate('solde');
                if (service && service.solde) {
                    service.solde.amount += parseFloat(commande.price);
                    await service.solde.save();
                }
            }
        }

        res.status(201).send(commande);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getCommandes = async (req, res) => {
    try {
        const commandes = await Commande.find();
        res.status(200).send(commandes);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getCommande = async (req, res) => {
    try {
        const commande = await Commande.findById(req.params.id);
        if (!commande) {
            return res.status(404).send();
        }
        res.status(200).send(commande);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateCommande = async (req, res) => {
    try {
        const commande = await Commande.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!commande) {
            return res.status(404).send();
        }
        res.status(200).send(commande);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deleteCommande = async (req, res) => {
    try {
        const commande = await Commande.findByIdAndDelete(req.params.id);
        if (!commande) {
            return res.status(404).send();
        }
        res.status(200).send(commande);
    } catch (error) {
        res.status(500).send(error);
    }
};
