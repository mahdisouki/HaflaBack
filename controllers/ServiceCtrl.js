const Service = require("../models/service");
const Solde = require("../models/solde");

exports.createService = async (req, res) => {
    try {
        const service = new Service(req.body);
        const solde = new Solde({ amount: 0 }); // Initialize solde with amount 0
        await solde.save();
        service.solde = solde._id;
        await service.save();
        res.status(201).send(service);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).send(services);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).send();
        }
        res.status(200).send(service);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateService = async (req, res) => {
    try {
        const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!service) {
            return res.status(404).send();
        }
        res.status(200).send(service);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deleteService = async (req, res) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id);
        if (!service) {
            return res.status(404).send();
        }
        res.status(200).send(service);
    } catch (error) {
        res.status(500).send(error);
    }
};
