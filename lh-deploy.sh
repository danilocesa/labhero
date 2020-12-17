#! /bin/bash
echo "-----Start deploying-----"
git init
rm -rf lh_web test_build #delete existing folder
echo "-----Downloading source code-----"
git clone https://herohub_admin@bitbucket.org/labhero_fe/lh_web.git
echo "-----Installing packages-----"
cd lh_web
git checkout production
git pull origin production
npm install
echo "-----Compiling source code-----"
npm run build
echo "-----Cleaning up-----"
cd ..
mkdir lhweb_build
mv lh_web/build/* ../
rm -rf lh_web
echo "-----Success deployment-----"
