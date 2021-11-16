#!/bin/sh
echo "running npm install"
npm i
if [ $? -eq 0 ]; then
  echo "edit .env file first"
  vim .env
  echo "installing systemd service..."
  sudo cp systemd.service /lib/systemd/system/imi-standalone-toolbox-api.service
  sudo systemctl enable imi-standalone-toolbox-api.service
  echo "starting systemd service..."
  sudo sudo /bin/systemctl start imi-standalone-toolbox-api.service
else
  echo "npm install failed"
fi
