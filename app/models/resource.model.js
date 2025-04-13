module.exports = (sequelize, Sequelize) => {
    const Resource = sequelize.define("resources", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Resource;
  };
  