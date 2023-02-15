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

3. Before installing any packages or application, you must activate your venv using:

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
3. Run `pip freeze > requirements.txt` to place all your dependencies in a .txt file. Pip freezing reads all installed dependencies and their version numbers.
4. Add the requirements text file to your git source control and commit and push!

---

## How to copy the venv packages onto your local machine.

1. Since now pulling the repo won't pull the venv folder, you'll have to create one once again using:
   
   `python3 -m venv <name_of_folder>`

2. If you named the folder something other than the original name in the gitignore, then add it to your gitignore list. Otherwise, you should be able to skip this step.

    `echo '<name_of_folder>' .gitignore`

3. Activate it:
    
    `source <name_of_folder>/bin/activate`

4. Once it's activated, do:

    `pip install -r /path/to/requirements.txt`

5. Now your venv and packages should be set up.

