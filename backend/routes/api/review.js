const express = require('express');
const router = express.Router();
const { Spot, Review, SpotImage, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')
