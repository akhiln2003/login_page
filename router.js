
var express = require('express');
var router = express.Router();

const credential = {
    email: "admin@gmail.com",
    password: "123"
};

// LOGIN USER
router.post('/login', (req, res) => {
    if (req.body.email == credential.email && req.body.password == credential.password) {
        req.session.user = req.body.email;
        res.redirect('/route/dashboard');

    } else {
        res.render('base', { error: "Invalid username or password" }); 
    }
});

// ROUTER FOR DASHBOARD
router.get('/dashboard', (req, res) => {
    if (req.session.user) {
        let products = [
            {
                src: "/assets/Vijay.png",
                name:"VIJAY ",
                bornin:" : (22 June 1974)",
                aboutas:"Vijay is a popular Indian actor and playback singer, known for his work in Tamil cinema. With a charismatic on-screen presence, he has garnered a massive fan following and achieved significant success. "
                            
            },
            {
                src: '/assets/dhanush.png',
                name:"DHSNUSH  ",
                bornin:" : (28 July 1983)",
                aboutas:"Dhanush is a renowned Indian actor, producer, and playback singer. Born on July 28, 1983, he gained fame for his versatile performances in Tamil cinema, including the critically acclaimed Aadukalam."
            },
            {
                src: '/assets/surya.png',
                name:"SURYA  ",
                bornin:" : (23 July 1975)",
                aboutas:"Surya is a renowned Indian actor, born on July 23, 1975. Known for his versatility, he has appeared in Tamil films, earning critical acclaim and numerous awards for his performances."
            },
            {
                src: '/assets/dulqur-salmaan.jpg',
                name:"DULQUR  ",
                bornin:" : (28 July 1983)",
                aboutas:"As of my last knowledge update in January 2022, it's unclear who you are referring to as DQindian actor. However, if you mean Dulquer Salmaan, he is a talented Indian actor known for his work in Malayalam and Tamil films, often praised for his versatile performances."
            },
            {
                src: '/assets/mammooty.png',
                name:"MAMMOOTY  ",
                bornin:" : (7 September 1951)",
                aboutas:"Mammootty, an iconic Indian actor, born on September 7, 1951, has dominated Malayalam cinema for decades. Renowned for his versatility, he's won numerous awards and garnered immense acclaim for his performances."
            },
            {
                src: '/assets/mohanlal.png',
                name:"MOHANLAL  ",
                bornin:" : (21 May 1960)",
                aboutas:"Mohanlal Viswanathan, known as Mohanlal, is a highly acclaimed Indian actor, producer, and playback singer in Malayalam cinema. Renowned for his versatile performances, he has received numerous awards and honors."
            }
        ];

        // PASS THE PRODUCTS ARRAY TO THE 'dashboard' VIEW
        res.render('dashboard', { user: req.session.user, products });
    } else {
        res.render('base');
    }
});

// ROUTER FOR LOGOUT
router.get('/logout', (req, res) => {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.render('base', { title: "Login System", logout: "Logout Successfully...!" });
        }
    });
});

module.exports = router;
