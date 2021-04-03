import bcrypt from 'bcrypt';
import { Request, Response, Router } from 'express';
import StatusCodes from 'http-status-codes';
import { User } from '@entities/User';


import { JwtService } from '@shared/jwtService';
import { paramMissingError, loginFailedErr, cookieProps, IRequest } from '@shared/constants';

const router = Router();
const jwtService = new JwtService();
const { BAD_REQUEST, OK, UNAUTHORIZED } = StatusCodes;



/******************************************************************************
 *                      Login User - "POST /api/auth/login"
 ******************************************************************************/

router.post('/login', async (req: IRequest, res: Response) => {
    // Check email and password present
    const { email, password } = req.body;
    if (!(email && password)) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    // Fetch user
    const user = await User.findOne({email});
    console.log(user)
    if (!user) {
        return res.status(UNAUTHORIZED).json({
            error: loginFailedErr,
        });
    }
    // Check password
    //const pwdPassed = await bcrypt.compare(password, user.pwdHash);
    //if (!pwdPassed) {
    //    return res.status(UNAUTHORIZED).json({
    //        error: loginFailedErr,
    //    });
    //}
    // Setup Admin Cookie
    const jwt = await jwtService.getJwt({
        id: user.id,
    });
    // Return
    return res.status(OK).json({
        jwt: jwt
    });
});



/******************************************************************************
 *                      Logout - "GET /api/auth/logout"
 ******************************************************************************/

router.get('/logout', (req: Request, res: Response) => {
    const { key, options } = cookieProps;
    res.clearCookie(key, options);
    return res.status(OK).end();
});



/******************************************************************************
 *                                 Export Router
 ******************************************************************************/

export default router;
