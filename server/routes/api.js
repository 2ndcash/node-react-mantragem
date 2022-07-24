var express = require('express');
const fs = require('fs')
const mkdirp = require('mkdirp')
const { upload } = require('../../helpers/multer')

if (!fs.existsSync(`./temp/`)) {
	mkdirp.sync(`./temp/`)
}

const userServices = require('../../services')
const { ListCard, GetCard, AddCard, EditCard } = require('../../services/card')
const { ListForm, GetForm, AddForm, EditForm } = require('../../services/moreform')
const { Dashboard } = require('../../services/customer')

var router = express.Router();

router.post('/upload', upload.single('file'), userServices.uploadPic)

router.get('/card-list', ListCard)
router.get('/data-card/:id', GetCard)
router.post('/add-card', AddCard)
router.post('/edit-card/:id', EditCard)

router.get('/moreform-list', ListForm)
router.get('/data-moreform/:id', GetForm)
router.post('/add-moreform', AddForm)
router.post('/edit-moreform/:id', EditForm)

router.get('/initial-dashboard', Dashboard)

module.exports = router;