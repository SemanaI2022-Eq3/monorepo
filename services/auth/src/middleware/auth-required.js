import passport from 'passport';

export const authRequired = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, user) => {
    if (error) {
      return next(error);
    }

    if (!user) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    req.user = user;
    return next();
  })(req, res);
};
