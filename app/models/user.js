
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      name: DataTypes.STRING,
      googleid: DataTypes.STRING,
      thumbnail: DataTypes.STRING,
    });
    
    return User;
  }