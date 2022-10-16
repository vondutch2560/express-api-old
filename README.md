Express API for multi app.

How to use without build source typescript

1/ get tracking info this repo
| git clone --no-checkout https://github.com/vondutch2560/express-api.git

2/ set folder nessesary to pull with command sparse-checkout
| git sparse-checkout set dist

3/ you can checkout list file in sparse-checkout with command below (this step can be skip)
| git sparse-checkout list

4/ download file (checkout) by command
| git checkout

5/ use git pull as normal when you need update version
| git pull

6/ Remember put env file in server
