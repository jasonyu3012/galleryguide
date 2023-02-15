# Creating an EC2 Instance

For our EC2 Instance, we decided to use an Amazon Machine Image running Ubuntu 22.04, t2.micro instance type, with default storage.

As for our security groups, we configured 3:

Note that all of these are using TCP protocol and allow all source connections (0.0.0.0/0)
- SSH on port 20
- HTTPS on 443
- HTTP on 80

Also, during this step, a key pair is created. For my Windows system WSL2, the private key must be moved / copied from the mounted Windows drive to ~/.ssh using 

`cp /mnt/<Windows Drive Letter>/<path>/<privatekey.pem> ~/.ssh`

Another thing you might have to do if you're on WSL like me is to change the permissions of the `.pem` file in case it's too open. When that happens, you'll get this when you try to ssh into your instance.

```
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@         WARNING: UNPROTECTED PRIVATE KEY FILE!          @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
Permissions <permission> for '/path/.pem' are too open.
It is required that your private key files are NOT accessible by others.
This private key will be ignored.
```

If that's the case, then:

`chmod 600 ~/.ssh/<name_of_pem>`

This makes it so that it is only read-writable by you.

You can also do `chmod 400` instead, which makes it only readable by you (thus blocking your write access). 600 is typically better in most cases.

[More information with ssh'ing into your instance using WSL can be found here.](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide//WSL.html)

>Another note: Amazon doesn't grant root access to EC2 instances by default (for seecurity purposes). Use the sudo command to obtain elevated privileges

Next, start your EC2 Instance and grab the IPv4 Address from the running instance.

# Adding DNS Records using Route53

> Route53 is Amazon's Domain Naming System (DNS) webservice

1. Create a hosted zone. A hosted zone is simply a container that holds information about how you want to route traffic for a domain.
2. Quick create an Apex Record with `www.<yourdomainname>` and set the value (what it points to) to the IP Address of your instance.
   
> Note that: A Records: A records map a domain name to an IPv4 address. When a client requests a website, the DNS resolver looks up the A record for the domain name, and returns the associated IP address to the client. The client then uses the IP address to access the website.
> 
> CNAME Records: CNAME records map a domain name to another domain name, instead of an IP address. When a client requests a website, the DNS resolver looks up the CNAME record for the domain name and returns the associated domain name. The resolver then repeats the process for the new domain name, until it finds the A record that maps the domain name to an IP address. The client uses the IP address to access the website.

3. Create another `A` alias record for just your `<domainname>` and set your alias target to your `www.<yourdomainname>` so that both records will hit the same target when entered in a web browser.

---

## Configuring your name servers if you purchased your domain from else where. 

If you bought your domain from a third party domain registrar and want yo use Route53 to manage your DNS for your domain, then you have to change the nameservers for your domain to the ones provided by Route53.

1. Copy the NS record values from your hosted zone for your domain. For Route53, these usually look something like

```
ns-592.awsdns-18.net.
ns-1532.awsdns-34.org.
ns-1237.awsdns-42.co.uk.
ns-48.awsdns-89.com.
```
2. Go to your domain registar, and under Nameservers or DNS management, or something similar, and replace whatever nameservers already present with the ones from your hosted zone.
3. Note that changes can take 24 - 48 hours to propagate.

> After this, you should be able to ssh into your instance by using 
> 
> `ss -i ~/.ssh/<pem_file> <user>@<domain_name>`
> and in our case it would be
>
> `ss -i ~/.ssh/<pem_file> ubuntu@galleryguide.me`

# Configuring your virtual environment for development with git

### [**If your server venv is already set up, click here to see how to set it up on your own machine**]()

>Virtual environments use the full absolute path when venv activate is used. However, this is not ideal since the venv might not be usable by other developers.

To combat this, we create a virtual environment on the virtual server. 

### Why should we have a virtual environment?

[From Stack Overflow:](https://stackoverflow.com/questions/32756711/is-it-necessary-to-use-virtualenv-to-use-flask-framework)

>No, there is no requirement to use a virtualenv. No project ever would require you to use one; it is just a method of insulating a collection
of Python libraries from other projects.
I personally do strongly recommend you use a virtualenv, because it makes it much, much easier to swap out versions of libraries and not affect other Python projects.

---

## First install any necessary Ubuntu components and setup

### **Note this has already been done for our project. Don't do these steps again!**

This includes our package manager (pip) and other tools essential for python development.

`sudo apt update`
`sudo apt install python3-pip python3-dev build-essential libssl-dev libffi-dev python3-setuptools`

Then we need the python virtual environment package.

`sudo apt install python3-venv`

Then we install our dependencies as we need (Gunicorn, Flask, Wheel, Flask-Restless-NG, SQLAlchemy, and more) in the venv.

1. First, clone your repo if you already have one. Otherwise, we create our project folder (and a backend / server folder if you want).
2. Create your virtual environment folder using:
   
    `python3 -m venv <name_of_folder>`

    Typical and standard names are venv and env.

3. Before installing any packages or applications, you must activate your venv using:

    `source <name_of_folder>/bin/activate`

You terminal prompt should be now something like this:

` (<name_of_folder>)user@host:~/<project_name>$`

4. Install your applications / packages. For this project, we did:

    ```
    pip install wheel
    pip install gunicorn Flask
    pip install Flask-Restless-NG
    pip install SQLAlchemy
    ```
    >Note that: installing wheel just makes sure your packages install even if they're missing wheel archives, in which a wheel is essentially a ZIP (.zip) archive with a specially crafted filename that tells installers what Python versions and platforms the wheel will support.

## Next step: Make this venv usable by other devs using git

Since this virtual environment has the potential to be unaccessable by other devs who clone this repo, we have to make a work around (for now, until we dockerize our backend).

1. After installing all your packages, run `deactivate` to stop the virtual environment.
2. Run `echo '<name_of_folder>' > .gitignore` to include your virtual environment folder to be ignored in source control.
3. Reactivate your virtual environment.
   
   Linux:
   `source <name_of_folder>/bin/activate`

   Windows:
   `.\<name_of_folder>\Scripts\activate`
4. Run `pip freeze > requirements.txt` to place all your dependencies in a .txt file. Pip freezing reads all installed dependencies and their version numbers.
5. Add the requirements text file to your git source control and commit and push!

---

## How to copy the venv packages onto your local machine.

1. Since now pulling the repo won't pull the venv folder, you'll have to create one once again using:
   
   Linux: `python3 -m venv <name_of_folder>` - for this project, we use venv as our virtual environment folder

   Windows:  `python -m venv <path>\<to>\<current_folder>\<name_of_folder>` e.g. 
   
   `python -m venv C:\Projects\SWE\art-project\backend\venv`

    or use `./venv` for current folder location + venv

    **NOTE - If you want the same Python version as our virtual server, download that version and run the following instead**

    Linux: `/<path>/<to>/<python_version>/<bin>/<python_version> -m venv <name_of_folder>`

    Windows: `C:\<path>\<to>\python.exe -m venv <path>\<to>\<current_folder>\<name_of_folder>`

    e.g.

    `C:\Users\jason\AppData\Local\Programs\Python\Python310\python.exe -m venv ./venv`

2. If you named the folder something other than the original name in the gitignore, then add it to your gitignore list. Otherwise, you should be able to skip this step.

    `echo '<name_of_folder>' > .gitignore`

3. Activate it:
    
    Linux: `source <name_of_folder>/bin/activate`

    Windows: `.\<name_of_folder>\Scripts\activate`

4. Once it's activated, do (same on Windows, but with \\ for path):

    `pip install -r /path/to/requirements.txt`

5. Now your venv and packages should be set up.
6. When you run any application, make sure to activate so that your application is ran inside the virtual environment. Once finished, you can just `deactivate` on both Windows/Linux to deactivate.

# Setting up Nginx (EngineX) on the virtual server

Why do we use both Nginx and Gunicorn? Aren't they both webservers? Doesn't flask already have a webserver?

>Although Flask has a built-in web server, as we all know, it's not suitable for production and needs to be put behind a real web server able to communicate with Flask through a WSGI protocol.

[Why do we use both Gunicorn and Nginx? This is a great read on why.](http://www.ines-panker.com/2020/02/16/nginx-uwsqi.html#:~:text=Nginx%20is%20%E2%80%9Ca%20web%20server,a%20type%20of%20web%20server.)

>Also, Nginx has some web server functionality (e.g., serving static pages; SSL handling) that gunicorn does not, whereas gunicorn implements WSGI (which nginx does not). Think of WSGI almost like REST, a specfication for webservers to talk to the application / framework that also supports WSGI.

1. Install Nginx (globally) with `sudo apt install nginx`
2. Adjust the firewall. You can see preset configurations that ufw (Uncomplicated FireWall) knows how to work with using `sudo ufw app list`

    You should get something like this:
    ```
    Output
    Available applications:
        Nginx Full
        Nginx HTTP
        Nginx HTTPS
        OpenSSH
    ```

    Meaning:

    Nginx Full: This profile opens both port 80 (normal, unencrypted web traffic) and port 443 (TLS/SSL encrypted traffic)
    
    Nginx HTTP: This profile opens only port 80 (normal, unencrypted web traffic)

    Nginx HTTPS: This profile opens only port 443 (TLS/SSL encrypted traffic)

3. Choose the most restrictive profile for now. *We can always change this later.

    `sudo ufw allow 'Nginx HTTP'`

    and 

    `sudo ufw allow 'OpenSSH'`

4. You can verify the change by:

    `sudo ufw status`

    ```
    Output
    Status: active

    To                         Action      From
    --                         ------      ----
    OpenSSH                    ALLOW       Anywhere                  
    Nginx HTTP                 ALLOW       Anywhere                  
    OpenSSH (v6)               ALLOW       Anywhere (v6)             
    Nginx HTTP (v6)            ALLOW       Anywhere (v6)
    ```

    If it says it's inactive, then enable the firewall: `sudo ufw enable` and try again.

Once all of what we have so far is completed, browsing to your domain should return a "Welcome to Nginx" default page.

# Nginx process management

`sudo systemctl stop nginx` Stops the webserver

`sudo systemctl start nginx` Starts the webserver when it's currently stopped

`sudo systemctl restart nginx` Restart

`sudo systemctl reload nginx` If making configuration changes, you can reload without dropping connection.

`sudo systemctl disable nginx` Nginx is configured to start when server boots. You can disable this behavior using this command.

`sudo systemctl enable nginx` Likewise, you can enable start on boot with this command.

---

# Configuring Gunicorn (Green Unicorn)

## Creating a WSGI entry point

This file essentially tells the Gunicorn server how to interact with application. Right now, we are just importing app and starting it.

```
from <project_name> import app

if __name__ == "__main__":
    app.run()
```

From there, you can check the status of your Gunicorn and see if it cna correctly serve our flask application. Make you have your virtual env activated and have port 5000 open.

```
(venv) $ cd ~/<project_name>
(venv) $ gunicorn --bind 0.0.0.0:5000 wsgi:app
```
You should get something like this.
```
Output
[2020-05-20 14:13:00 +0000] [46419] [INFO] Starting gunicorn 20.0.4
[2020-05-20 14:13:00 +0000] [46419] [INFO] Listening at: http://0.0.0.0:5000 (46419)
[2020-05-20 14:13:00 +0000] [46419] [INFO] Using worker: sync
[2020-05-20 14:13:00 +0000] [46421] [INFO] Booting worker with pid: 46421

```

### Now, you can deactivate your venv.

Our next step is to create a .service file, which allows us to automatically start Gunicorn and serve our flask application whenever the server boots. If it fails for some reason, it'll also get rebooted.

First step is to create and edit a file using nano:

`sudo nano /etc/systemd/system/<flask_app_name>.service`

Then, we write:

```
[Unit]
Description=Gunicorn instance to serve <flask_app_name>
After=network.target

[Service]
User=<user>
Group=www-data
WorkingDirectory=/home/<user>/<folder>/<containing_app>
Environment="PATH=/home/<user>/<folder>/<containing_app>/<venv_folder>/bin"
ExecStart=/home/<user>/<folder>/<containing_app>/<venv_folder>/bin/gunicorn --workers <num_workers> --bind unix:<app_name>.sock -m 007 wsgi:app

[Install]
WantedBy=multi-user.target
```

- This systemd service will be started after the `network` service is UP while booting up
- The service will be launched by the user specified by the `User` directive (meaning that the service will get the UID of this user) and the same applies to the `Group` directive, we chose `www-data` because this is the group used by nginx, so the communication between gunicorn and Nginx will be easier.
- `WorkingDirectory` directive refers to the directory in which the flask app is located.
- `Environment` directive specifies the virtual environment path which we are using for our web app
- `ExecStart` contains the command that will be used to launch the service, in this case we used bash command to activate the virtual environment and launch the gunicorn with 4 workers
- We are binding our gunicorn server to `unix:<app_name>.sock`, this simply is a socket in the server that gunicorn uses for interpersonal communication (IPC), nginx will use this socket to communicate with gunicorn, it is created when the command is launched and removed when the process is killed for any reason and it is different every time
- We’ll set an umask value of 007 so that the socket file is created giving access to the owner and group, while restricting other access

Save and exit.

Next, you want to start the Gunicorn service that you created and enable it so it starts at boot.

```
sudo systemctl start <service_file_name>
sudo systemctl enable <service_file_name>
```

Your naming should be consistent. In our case, our application name, service file, and our ipc file, are all named appserver.

Check the status:

`sudo systemctl status myproject`

Our output looks like this
```
● appserver.service - Gunicorn instance to serve appserver
     Loaded: loaded (/etc/systemd/system/appserver.service; enabled; vendor preset: enabled)
     Active: active (running) since Wed 2023-02-15 22:19:40 UTC; 24s ago
   Main PID: 7299 (gunicorn)
      Tasks: 5 (limit: 1143)
     Memory: 69.3M
        CPU: 585ms
     CGroup: /system.slice/appserver.service
             ├─7299 /home/ubuntu/art-project/backend/venv/bin/python3 /home/ubuntu/art-project/backend/venv/bin/gunicor>
             ├─7300 /home/ubuntu/art-project/backend/venv/bin/python3 /home/ubuntu/art-project/backend/venv/bin/gunicor>
             ├─7301 /home/ubuntu/art-project/backend/venv/bin/python3 /home/ubuntu/art-project/backend/venv/bin/gunicor>
             ├─7302 /home/ubuntu/art-project/backend/venv/bin/python3 /home/ubuntu/art-project/backend/venv/bin/gunicor>
             └─7303 /home/ubuntu/art-project/backend/venv/bin/python3 /home/ubuntu/art-project/backend/venv/bin/gunicor>

Feb 15 22:19:40 ip-172-31-51-6 systemd[1]: Started Gunicorn instance to serve appserver.
Feb 15 22:19:40 ip-172-31-51-6 gunicorn[7299]: [2023-02-15 22:19:40 +0000] [7299] [INFO] Starting gunicorn 20.1.0
Feb 15 22:19:40 ip-172-31-51-6 gunicorn[7299]: [2023-02-15 22:19:40 +0000] [7299] [INFO] Listening at: unix:appserver.s>
Feb 15 22:19:40 ip-172-31-51-6 gunicorn[7299]: [2023-02-15 22:19:40 +0000] [7299] [INFO] Using worker: sync
Feb 15 22:19:40 ip-172-31-51-6 gunicorn[7300]: [2023-02-15 22:19:40 +0000] [7300] [INFO] Booting worker with pid: 7300
Feb 15 22:19:40 ip-172-31-51-6 gunicorn[7301]: [2023-02-15 22:19:40 +0000] [7301] [INFO] Booting worker with pid: 7301
Feb 15 22:19:40 ip-172-31-51-6 gunicorn[7302]: [2023-02-15 22:19:40 +0000] [7302] [INFO] Booting worker with pid: 7302
Feb 15 22:19:40 ip-172-31-51-6 gunicorn[7303]: [2023-02-15 22:19:40 +0000] [7303] [INFO] Booting worker with pid: 7303
```

---

# Configure Gunicorn as Supervisor?

Not sure, to be added.

# Configuring Nginx

This directory contains all the files related to nginx, we need to create a configuration file that will make nginx act as a proxy for our flask app.

The main configuration file is the one named nginx.conf, by convention, this file is not touched by developers or sys-admins, new configuration files are created in the sites-available/ directory and then sym-linked to the /sites-enabled/ directory.

Begin by creating a new server block configuration file in Nginx’s sites-available directory. Call this myproject to keep in line with the rest of the guide:

```
sudo nano /etc/nginx/sites-available/<name>
```

**We will do `appserver` once again to keep inline with our naming system**

```
server {
    listen 80;
    server_name your_domain www.your_domain;

    location / {
        include proxy_params;
        proxy_pass http://unix:/home/<user>/<project>/<folder>/myproject.sock;
    }
}
```

Ours looks like this:
```
server {
        listen 80;
        server_name www.galleryguide.me galleryguide.me;

        location / {
                include proxy_params;
                proxy_pass http://unix:/home/ubuntu/art-project/backend/appserver.sock;
        }
}
```

Check your syntax with `sudo nginx -t`

Once everything is OK, then linked your file to the sites-enabled directory using:

`sudo ln -s /etc/nginx/sites-available/<file_name> /etc/nginx/sites-enabled`

Double check using `sudo ls -l  /etc/nginx/sites-enabled/
` and you should see your site as an output.

Restart using `sudo systemctl restart nginx`

> The above configurations instructs nginx to listen on port 80 and proxy all the connections to the socket that we created earlier, so that gunicorn can read from the socket and allows our flask app to respond, then gunicorn takes the response from the flask app and writes it to the socket so that nginx can read from the socket and return the response to the user.

Lastly, adjust your firewall.

```
sudo ufw delete allow 5000
sudo ufw allow 'Nginx Full'
```

Now you should be able to access your server's domain name in the web browser.

If you get a 502 gateway error, it means Nginx cannot access gunicorn’s socket file. Usually this is because the user’s home directory does not allow other users to access files inside it.

If your socket file is called `/home/ubuntu/art-project/backend/myproject.sock`, ensure that /home/sammy has a minimum of 0755 permissions

`sudo chmod 755 /home/ubuntu`

If there are any other errors, then:

```
sudo less /var/log/nginx/error.log: checks the Nginx error logs.
sudo less /var/log/nginx/access.log: checks the Nginx access logs.
sudo journalctl -u nginx: checks the Nginx process logs.
sudo journalctl -u myproject: checks your Flask app’s Gunicorn logs.
```

---





