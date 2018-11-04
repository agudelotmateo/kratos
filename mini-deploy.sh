# cd to the repository containing the Composer project
cd $HOME/Documents/kratos/

# create the BNA
composer archive create -t dir -n .

# deploy the blockchain to Fabric based on BNA
composer network install -c PeerAdmin@hlfv1 -a kratos@0.0.1.bna
composer network start -n kratos -V 0.0.1 -A admin -S adminpw -c PeerAdmin@hlfv1 -f networkadmin.card
composer card import -f networkadmin.card

# generate REST server for the now deployed blockchain
composer-rest-server -c admin@kratos -n never -a false -w true -t false -p $BLOCKCHAIN_PORT
