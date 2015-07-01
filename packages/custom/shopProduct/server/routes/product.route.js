'use strict';

var controller = require('../controllers/shopProduct');

module.exports = function (ShopProduct, app, auth, database, shopCore) {
    //([A-Za-z0-9]{24})
    app.route('/api/products/:id')
        .get(controller.getById);

    app.route('/api/products')
        .get(controller.list);

    app.route('/api/products/:sku')
        .get(controller.getBySKU);

    app.route('/api/photos')
        .post(function (req, res) {
            shopCore.media.create(req.files.upload)
                .then(function (file) {
                    return res.status(200).json(file);
                })
                .catch(function (error) {
                    return res.status(500).json({error: error});
                })
                .done();
        });
    app.route('/api/products/photos')
        .post(function (req, res) {
            shopCore.media.create(req.files.file)
                .then(function (file) {
                    return res.status(200).json(file);
                })
                .catch(function (error) {
                    return res.status(500).json({error: error});
                })
                .done();
        });
    app.route('/api/products/photos/:id')
        .get(function (req, res) {
            var stream = shopCore.media.get(req.params.id);
            stream.pipe(res);
            return res.status(200);
        })
        .delete(function (req, res) {
            shopCore.media.delete(req.params.id)
                .then(function () {
                    return res.status(200).json({msg: 'Deleted successfully!'});
                })
                .catch(function (error) {
                    return res.status(500).json({error: error});
                })
                .done();
        });

    app.route('/api/products/')
        .post(function(req, res){
            controller.create(req, res);
        });
};