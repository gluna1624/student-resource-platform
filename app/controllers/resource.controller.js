const db = require("../models");
const Resource = db.resource;

// Create new resource
exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }

  const resource = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ?? false
  };

  Resource.create(resource)
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({ message: err.message || "Error creating resource." });
    });
};

// Get all resources
exports.findAll = (req, res) => {
  Resource.findAll()
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({ message: err.message || "Error retrieving resources." });
    });
};

// Find one
exports.findOne = (req, res) => {
  const id = req.params.id;

  Resource.findByPk(id)
    .then(data => {
      if (data) res.send(data);
      else res.status(404).send({ message: `Resource with id=${id} not found.` });
    })
    .catch(err => {
      res.status(500).send({ message: `Error retrieving resource with id=${id}` });
    });
};

// Update
exports.update = (req, res) => {
  const id = req.params.id;

  Resource.update(req.body, { where: { id: id } })
    .then(num => {
      if (num == 1) res.send({ message: "Resource was updated successfully." });
      else res.send({ message: `Cannot update resource with id=${id}.` });
    })
    .catch(err => {
      res.status(500).send({ message: `Error updating resource with id=${id}` });
    });
};

// Delete
exports.delete = (req, res) => {
  const id = req.params.id;

  Resource.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) res.send({ message: "Resource was deleted successfully!" });
      else res.send({ message: `Cannot delete resource with id=${id}.` });
    })
    .catch(err => {
      res.status(500).send({ message: `Could not delete resource with id=${id}` });
    });
};

// Delete all
exports.deleteAll = (req, res) => {
  Resource.destroy({ where: {}, truncate: false })
    .then(nums => res.send({ message: `${nums} resources were deleted successfully!` }))
    .catch(err => {
      res.status(500).send({ message: err.message || "Error removing all resources." });
    });
};
