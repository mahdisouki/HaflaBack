const Solde = require("../models/solde");

exports.createSolde = async (req, res) => {
    try {
        const solde = new Solde(req.body);
        await solde.save();
        res.status(201).send(solde);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getSoldes = async (req, res) => {
    try {
        const soldes = await Solde.find();
        res.status(200).send(soldes);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getSolde = async (req, res) => {
    try {
        const solde = await Solde.findById(req.params.id);
        if (!solde) {
            return res.status(404).send();
        }
        res.status(200).send(solde);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateSolde = async (req, res) => {
    try {
        const solde = await Solde.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!solde) {
            return res.status(404).send();
        }
        res.status(200).send(solde);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deleteSolde = async (req, res) => {
    try {
        const solde = await Solde.findByIdAndDelete(req.params.id);
        if (!solde) {
            return res.status(404).send();
        }
        res.status(200).send(solde);
    } catch (error) {
        res.status(500).send(error);
    }
};
