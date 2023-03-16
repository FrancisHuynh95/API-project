// backend/routes/api/index.js
const router = require('express').Router();

// GET /api/restore-user
const { restoreUser } = require('../../utils/auth.js');

router.use(restoreUser);



// ...

// GET /api/require-auth
const { requireAuth } = require('../../utils/auth.js');
router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);

module.exports = router;
