---
title: Oracle
description: 
published: true
date: 2021-01-22T16:18:45.911Z
tags: 
editor: undefined
dateCreated: 2021-01-22T13:34:37.747Z
---

## Requête user
### Lister les schéma d'une base
```sql
select distinct owner from dba_objects where owner like '%<string_to_search>%';
```
&nbsp;

### Lister les usernames d'une base
```sql
select username from all_users where username like '%<string_to_search>%';
```
&nbsp;

### Dropper un schéma 
```sql
Drop user "&user" cascade;
```
&nbsp;

### Lister les schémas d'une base
```sql
select distinct owner from dba_objects where owner like '%<string_to_search>%';
```

&nbsp;

### Killer une session
```sql
ALTER SYSTEM KILL SESSION 'sid,serial#' IMMEDIATE;
```
&nbsp;

### Lister les comptes vérouilllés
```sql
set linesize 300
COL "USERNAME" FORMAT A15
COL "ACCOUNT_STATUS" FORMAT A20
COL "CREATED" FORMAT A10
SELECT username, account_status, created, lock_date, expiry_date, profile
FROM dba_users
WHERE account_status != 'OPEN';

set linesize 300
COL "USERNAME" FORMAT A15
COL "ACCOUNT_STATUS" FORMAT A20
COL "CREATED" FORMAT A10
select username, account_status, profile, created, lock_date,EXPIRY_DATE, round(EXPIRY_DATE - SYSDATE) nb_jour_avant_expiration
from   dba_users
order by nb_jour_avant_expiration;
```
&nbsp;

### Changer le MDP d'un utilisateur
```sql
alter user <user> identified by <new_password>;
```
&nbsp;

### Déverouiller un compte utilisateur
```sql
alter user <user> account unlock;
```
&nbsp;

### Gestion des profiles oracle
```sql
COL "PROFILE" FORMAT A15
COL "RESOURCE_NAME" FORMAT A30
COL "RESOURCE_TYPE" FORMAT A15
COL "LIMIT" FORMAT A15
select * from dba_profiles
```
&nbsp;

### Connaitre mon utilisateur et schéma actuel
```sql
select sys_context('USERENV','SESSION_USER') current_user, sys_context('USERENV','SESSION_SCHEMA') current_schema from dual;
```
&nbsp;

### Lister les sessions active
```sql
set echo off
set feed off
set linesize 512

column machine format a20
column osuser format a10
column module format a30

SELECT machine,process,osuser,username,schemaname,status,lockwait,sid,serial#,module,action FROM v$session
WHERE username is not null
AND osuser is not null
AND STATUS != 'INACTIVE'
ORDER BY machine,osuser,username,schemaname,status,module;
```
&nbsp;

### Affichier les verrous
```sql
SET echo off
    SET feedback off
    SET linesize 512
     
    prompt -----------------------
    prompt - Verrous sur la base -
    prompt -----------------------
     
    COLUMN sid format 999 heading "SID"
    COLUMN username format a10 heading "Utilisateur"
    COLUMN machine format a20 heading "Nom Machine"
    COLUMN object_name format a20 heading "Nom objet"
    COLUMN type format a4 heading "Type"
    COLUMN lmode format a20 heading "Mode de verrouillage"
    COLUMN request format 9999999 heading "Request Mode"
    COLUMN block format 9999999 heading "Lock Blocking"
     
    SELECT
    s.sid sid,
    s.username username,
    s.machine machine,
    l.type type,
    o.object_name object_name,
    DECODE(l.lmode,
    0,'None',
    1,'Null',
    2,'Row Share',
    3,'Row Exlusive',
    4,'Share',
    5,'Sh/Row Exlusive',
    6,'Exclusive') lmode,
    DECODE(l.request,
    0,'None',
    1,'Null',
    2,'Row Share',
    3,'Row Exlusive',
    4,'Share',
    5,'Sh/Row Exlusive',
    6,'Exclusive') request,
    l.block block
    FROM
    v$lock l,
    v$session s,
    dba_objects o
    WHERE
    l.sid = s.sid
    AND
    username != 'SYSTEM'
    AND
    o.object_id(+) = l.id1; 
```
&nbsp;


### Lister les rôles d'un utilisateur
```sql
COL "Utilisateur" FORMAT A25
COL "Roles" FORMAT A25		  
SELECT grantee "Utilisateur",
granted_role "Roles",
admin_option
FROM dba_role_privs
WHERE grantee = '&1'
UNION
   SELECT  grantee "Utilisateur",
   granted_role "Roles",
   admin_option
   FROM dba_role_privs
   WHERE  grantee in (SELECT granted_role
                      FROM DBA_ROLE_PRIVS
                      WHERE grantee = '&1');
```
&nbsp;

### Lister les privilèges d'un rôle
```sql
COL "Roles" FORMAT A25
COL "Privilege Systeme" FORMAT A40
SELECT grantee "Roles" ,
Privilege "Privilege Systeme",
admin_option
FROM dba_sys_privs
WHERE grantee in (SELECT granted_role
                  FROM dba_role_privs
                  WHERE grantee = '&1'
                  UNION
                  SELECT granted_role
                  FROM dba_role_privs
                  WHERE grantee in (SELECT granted_role
                  FROM DBA_ROLE_PRIVS
                  WHERE grantee = '&1'))
                  ORDER BY 1 DESC;
```
&nbsp;

## Trigger
### Générer ordre de suppression trigger
```sql
Select 'drop trigger ' || trigger_name || ';' stmt from user_triggers;
```
&nbsp;

## Tablespace
### Lister les tablespaces par défaut d'un user (sysdba)
```sql
select username,default_tablespace from dba_users where default_tablespace='TOOLS';
```
&nbsp;


### Lister les tablespaces par défaut d'un user
```sql
select default_tablespace from user_users;
```
&nbsp;

### Lister les tablespaces + taille (Alloué - occupé - libre)
```sql
clear breaks
clear computes
clear columns
set pagesize 50
set linesize 120
set heading on
column tablespace_name heading 'Tablespace' justify left format a20 truncated
column tbsize heading 'Size (Mb) ' justify left format 9,999,999.99
column tbused heading 'Used (Mb) ' justify right format 9,999,999.99
column tbfree heading 'Free (Mb) ' justify right format 9,999,999.99
column tbusedpct heading 'Used % ' justify left format a8
column tbfreepct heading 'Free % ' justify left format a8
break on report
compute sum label 'Totals:' of tbsize tbused tbfree on report
select t.tablespace_name, round(a.bytes,2) tbsize,
nvl(round(c.bytes,2),'0') tbfree,
nvl(round(b.bytes,2),'0') tbused,
to_char(round(100 * (nvl(b.bytes,0)/nvl(a.bytes,1)),2)) || '%' tbusedpct,
to_char(round(100 * (nvl(c.bytes,0)/nvl(a.bytes,1)),2)) || '%' tbfreepct
from dba_tablespaces t,
(select tablespace_name, round(sum(bytes)/1024/1024,2) bytes
from dba_data_files
group by tablespace_name
union
select tablespace_name, round(sum(bytes)/1024/1024,2) bytes
from dba_temp_files
group by tablespace_name ) a,
(select e.tablespace_name, round(sum(e.bytes)/1024/1024,2) bytes
from dba_segments e
group by e.tablespace_name
union
select tablespace_name, sum(max_size) bytes
from v$sort_segment
group by tablespace_name) b,
(select f.tablespace_name, round(sum(f.bytes)/1024/1024,2) bytes
from dba_free_space f
group by f.tablespace_name
union
select tmp.tablespace_name, (sum(bytes/1024/1024) - sum(max_size)) bytes
from dba_temp_files tmp, v$sort_segment sort
where tmp.tablespace_name = sort.tablespace_name
group by tmp.tablespace_name) c
where
t.tablespace_name = a.tablespace_name (+)
and t.tablespace_name = b.tablespace_name (+)
and t.tablespace_name = c.tablespace_name (+)
order by t.tablespace_name;
```
&nbsp;

### Lister les tablespaces + fichier et status
```sql
set linesize 200
COL "STATUS" FORMAT A10
COL "TABLESPACE_NAME" FORMAT A20
COL "FILE_NAME" FORMAT A80
SELECT 
FILE_ID, STATUS, TABLESPACE_NAME, FILE_NAME
FROM 
DBA_DATA_FILES
ORDER BY FILE_ID; 
```
&nbsp;

### Supprimer un tablespace
```sql
ALTER DATABASE DATAFILE '<filename>' OFFLINE DROP;
DROP TABLESPACE <TableSpace>;
```
&nbsp;

### Vérifier le contenu du tablespace SYSAUX
```sql
select occupant_desc, space_usage_kbytes/1024 as usage_GB from v$sysaux_occupants where space_usage_kbytes > 0 order by space_usage_kbytes desc;
```
&nbsp;

### Savoir si un tablespace est en "Autoextend"
```sql
select tablespace_name, file_name ,AUTOEXTENSIBLE,MAXBYTES,INCREMENT_BY from dba_data_files order by 1,2;
```
&nbsp;

### Voir qui utilise le tablespace TEMP
```sql
select * from v$sort_usage;
```

&nbsp;

## Tables
### Lister les tables d'un schéma
==> D'un utilisateur lambda
```sql
SELECT DISTINCT OWNER,TABLE_NAME FROM all_tab_columns WHERE OWNER = ‘E_CTM’;
```
==> D'un utilisateur système
```sql
SELECT DISTINCT OWNER,TABLE_NAME FROM dba_tab_columns WHERE OWNER = ‘E_CTM’;
```
&nbsp;

### Lister les tables d'un utilisateur
```sql
SELECT table_name FROM user_tables;
SELECT table_name FROM all_tables;
```
> all_tables : incluant les tables système (nécéssite les droits DBA)
{.is-info}

&nbsp;

### Compter le nombre de tables d'un schéma
```sql
Select count(*), owner FROM ALL_TABLES group by owner;
```
&nbsp;


### Vider une table
==> Un ou plusieurs champs
```sql
Delete from [table] where ID = ‘kkechose’ ;
```
==> Une table
```sql
Truncate table [schema].[table];
```

Si le message suivant apparait :
> ORA-02266: les clés primaires/uniques de la table sont référencées par des clés
étrangères
{.is-danger}

ajouter :
```sql
DROP PRIMARY KEY CASCADE;
```
&nbsp;


### Supprimer une table
```sql
Drop table [table] cascade constraints purge;
```

> purge = pas possible de faire un rollback sur la table = suppression définitive
{.is-info}

&nbsp;

### Générer ordre SQL "Grant Table"
```sql
select 'GRANT SELECT ON '||owner||'.'||table_name||' to role' from all_tables where owner='user';
```
&nbsp;


### Lister les colonnes d'une table
```sql
SELECT COLUMN_NAME FROM USER_TAB_COLUMNS WHERE TABLE_NAME='CONFIGURATION';
```
&nbsp;

## Sauvegarde/Restauration RMAN 
### Connaitre les bases listés sur RMAN
```sql
set linesize 1000
select * from rman.rc_database order by NAME;
```
&nbsp;

### Restauration des archivelogs à partir d'un backup RMAN
```sql
rman target /

RUN
{
    ALLOCATE CHANNEL t1 DEVICE TYPE disk;
    set archivelog destination to '/appli/oracle/PCONAT/oraarch/';
    restore archivelog from logseq 3490 until logseq 3495;
    release channel t1;
}
```
&nbsp;


### Supprimer des archlogs depuis RMAN
```sql
export ORACLE_SID=XXX ; rman target /
crosscheck archivelog all; # vérifier les aarchlogs connus depuis les controlfiles
delete noprompt expired archivelog all;  # Expiré
delete noprompt archivelog until time ‘SYSDATE-10’; # depuis une date précise
delete noprompt obsolete; 
delete archivelog all backed up 1 times to disk completed before 'sysdate - 4/24';
```
> Pour cette dernière commande `delete` , supprimer les archlogs générés depuis les 4 dernières heure et sauvegardé au moins une fois sur disque
{.is-info}

&nbsp;


### Connaitre la quantité d'archlogs généré par jour
```sql
  SELECT SUM_ARCH.DAY,
         SUM_ARCH.GENERATED_MB,
         SUM_ARCH_DEL.DELETED_MB,
         SUM_ARCH.GENERATED_MB - SUM_ARCH_DEL.DELETED_MB "REMAINING_MB"
    FROM (  SELECT TO_CHAR (COMPLETION_TIME, 'DD/MM/YYYY') DAY,
                   SUM (ROUND ( (blocks * block_size) / (1024 * 1024), 2))
                      GENERATED_MB
              FROM V$ARCHIVED_LOG
             WHERE ARCHIVED = 'YES'
          GROUP BY TO_CHAR (COMPLETION_TIME, 'DD/MM/YYYY')) SUM_ARCH,
         (  SELECT TO_CHAR (COMPLETION_TIME, 'DD/MM/YYYY') DAY,
                   SUM (ROUND ( (blocks * block_size) / (1024 * 1024), 2))
                      DELETED_MB
              FROM V$ARCHIVED_LOG
             WHERE ARCHIVED = 'YES' AND DELETED = 'YES'
          GROUP BY TO_CHAR (COMPLETION_TIME, 'DD/MM/YYYY')) SUM_ARCH_DEL
   WHERE SUM_ARCH.DAY = SUM_ARCH_DEL.DAY(+)
ORDER BY TO_DATE (DAY, 'DD/MM/YYYY');
```
&nbsp;

### Connaitre le nombre d'archlogs généré par heure chaque jour
```sql
 SELECT TO_CHAR (COMPLETION_TIME, 'DD/MM/YYYY') DAY,
         SUM (DECODE (TO_CHAR (COMPLETION_TIME, 'HH24'), '00', 1, NULL))
            "00-01",
         SUM (DECODE (TO_CHAR (COMPLETION_TIME, 'HH24'), '01', 1, NULL))
            "01-02",
         SUM (DECODE (TO_CHAR (COMPLETION_TIME, 'HH24'), '02', 1, NULL))
            "02-03",
         SUM (DECODE (TO_CHAR (COMPLETION_TIME, 'HH24'), '03', 1, NULL))
            "03-04",
         SUM (DECODE (TO_CHAR (COMPLETION_TIME, 'HH24'), '04', 1, NULL))
            "04-05",
         SUM (DECODE (TO_CHAR (COMPLETION_TIME, 'HH24'), '05', 1, NULL))
            "05-06",
         SUM (DECODE (TO_CHAR (COMPLETION_TIME, 'HH24'), '06', 1, NULL))
            "06-07",
         SUM (DECODE (TO_CHAR (COMPLETION_TIME, 'HH24'), '07', 1, NULL))
            "07-08",
         SUM (DECODE (TO_CHAR (COMPLETION_TIME, 'HH24'), '08', 1, NULL))
            "08-09",
         SUM (DECODE (TO_CHAR (COMPLETION_TIME, 'HH24'), '09', 1, NULL))
            "09-10",
         SUM (DECODE (TO_CHAR (COMPLETION_TIME, 'HH24'), '10', 1, NULL))
            "10-11",
         SUM (DECODE (TO_CHAR (COMPLETION_TIME, 'HH24'), '11', 1, NULL))
            "11-12",
         SUM (DECODE (TO_CHAR (COMPLETION_TIME, 'HH24'), '12', 1, NULL))
            "12-13",
         SUM (DECODE (TO_CHAR (COMPLETION_TIME, 'HH24'), '13', 1, NULL))
            "13-14",
         SUM (DECODE (TO_CHAR (COMPLETION_TIME, 'HH24'), '14', 1, NULL))
            "14-15",
         SUM (DECODE (TO_CHAR (COMPLETION_TIME, 'HH24'), '15', 1, NULL))
            "15-16",
         SUM (DECODE (TO_CHAR (COMPLETION_TIME, 'HH24'), '16', 1, NULL))
            "16-17",
         SUM (DECODE (TO_CHAR (COMPLETION_TIME, 'HH24'), '17', 1, NULL))
            "17-18",
         SUM (DECODE (TO_CHAR (COMPLETION_TIME, 'HH24'), '18', 1, NULL))
            "18-19",
         SUM (DECODE (TO_CHAR (COMPLETION_TIME, 'HH24'), '19', 1, NULL))
            "19-20",
         SUM (DECODE (TO_CHAR (COMPLETION_TIME, 'HH24'), '20', 1, NULL))
            "20-21",
         SUM (DECODE (TO_CHAR (COMPLETION_TIME, 'HH24'), '21', 1, NULL))
            "21-22",
         SUM (DECODE (TO_CHAR (COMPLETION_TIME, 'HH24'), '22', 1, NULL))
            "22-23",
         SUM (DECODE (TO_CHAR (COMPLETION_TIME, 'HH24'), '23', 1, NULL))
            "23-00",
         COUNT (*) TOTAL
    FROM V$ARCHIVED_LOG
WHERE ARCHIVED='YES'
GROUP BY TO_CHAR (COMPLETION_TIME, 'DD/MM/YYYY')
ORDER BY TO_DATE (DAY, 'DD/MM/YYYY');
```
&nbsp;

## Datapump
### Réaliser un export DATAPUMP
```sql
expdp \"/ as sysdba\" SCHEMAS=metier DIRECTORY=DATA_PUMP_DIR DUMPFILE=metier.dmp LOGFILE=metier.log
```

&nbsp;


### Réaliser un import DATAPUMP
```sql
impdp \"/ as sysdba\" SCHEMAS=metier DIRECTORY=DATA_PUMP_DIR DUMPFILE=metier.dmp LOGFILE=metier.log
```

&nbsp;


### Import avec remap schéma
```sql
impdp \"/ as sysdba\" SCHEMAS=MGNADMF DIRECTORY=DATAPUMP DUMPFILE=MGNNATfull20160624.dmp LOGFILE=impdp_IQ_MGNNAT_MGNRW_280616.log REMAP_SCHEMA=MGNADMF:MGNRW
```
> Options Possible :
`TABLE_EXISTS_ACTION = SKIP | APPEND | TRUNCATE | REPLACE`
{.is-info}


&nbsp;


### Purger les données d'un schéma
```sql
select 'DROP '||OBJECT_TYPE||' '||OWNER||'.'||OBJECT_NAME||';' from dba_objects where owner='GAGCVEILLE' and OBJECT_TYPE<>'INDEX';
```

&nbsp;


### Purger la corbeille
```sql
purge dba_recyclebin;
```

&nbsp;


### Gestion du directory DATAPUMP
```sql
create or replace directory as 'G:\..\..';

GRANT read, write ON DIRECTORY to ;

drop directory '.....' ;
```

&nbsp;


### Monitorer les jobs DATAPUMP
```sql
COL OWNER_NAME FORMAT A11
COL JOB_NAME FORMAT A20
COL OPERATION FORMAT A11
COL JOB_MODE FORMAT A9
COL STATE FORMAT A12
SET LINESIZE 120

Select * FROM DBA_DATAPUMP_JOBS;
```
ou
```sql
set lines 200
col owner_name format a10;
col state format a11
col operation like state
col job_mode like state

select owner_name, job_name, operation, job_mode, state, attached_sessions
from dba_datapump_jobs
where job_name not like 'BIN$%'
order by 1,2;
```

&nbsp;


### Killer les jobs DATAPUMP
```sql
PENDANT
<code sql>
CTRL-C
stop_job=immediate
yes


APRES
<code sql>
set serveroutput on
set lines 100
declare
h1 number;
begin
— Format: dbms_datapump.attach('[job_name]','[owner_name]');
h1 := dbms_datapump.attach('SYS_EXPORT_SCHEMA_01','SYS');
dbms_datapump.stop_job (h1,1,0);
end;
/
```

&nbsp;


### Dropper les jobs DATAPUMP inutile
```sql
DROP TABLE SYS.SYS_IMPORT_FULL_01;
DROP TABLE SYS.SYS_EXPORT_FULL_01;
DROP TABLE SYS.SYS_IMPORT_SCHEMA_01;
DROP TABLE SYS.SYS_EXPORT_SCHEMA_01;
```

### Monter un partage CIFS pour export DATAPUMP
```sql
mount.cifs //stock-ora/oradump$/RepDump /mnt/share --verbose -ouser=<user>,pass=<pass>,auto,uid=oracle,gid=dba 0 0

          DISTANT                      LOCAL
```

### Voir le transfert pendant l'export ou l'import (avec le user SYS)
```sql
select sid, serial#, username, program, module, event, seconds_in_wait from v$session where username = 'SYS';
```

&nbsp;

## Dataguard
### Vérifier la bonne réplication des archlogs
==> Sur le serveur primaire
```sql
SELECT THREAD#, SEQUENCE#, ARCHIVED, APPLIED FROM V$ARCHIVED_LOG WHERE RECID IN (SELECT MAX(RECID) FROM V$ARCHIVED_LOG);
```
==> Sur le serveur de secours
```sql
SELECT ARCH.THREAD# "THREAD", ARCH.SEQUENCE# "LAST_RECEIVED",
APPL.SEQUENCE# "LAST_APPLIED", (ARCH.SEQUENCE# - APPL.SEQUENCE#) "DIFFERENCE"
FROM
(SELECT THREAD# ,SEQUENCE# FROM V$ARCHIVED_LOG WHERE (THREAD#,FIRST_TIME ) IN
(SELECT THREAD#,MAX(FIRST_TIME) FROM V$ARCHIVED_LOG GROUP BY THREAD#)) ARCH,
(SELECT THREAD# ,SEQUENCE# FROM V$LOG_HISTORY WHERE (THREAD#,FIRST_TIME ) IN
(SELECT THREAD#,MAX(FIRST_TIME) FROM V$LOG_HISTORY GROUP BY THREAD#)) APPL
WHERE ARCH.THREAD# = APPL.THREAD#
ORDER BY 1;
```
&nbsp;

### Vérifier l'état des process d'archivage sur la stanby (MRP0) ou sur le primaire (LGWR)
```sql
select process,status,sequence# from v$managed_standby where process='LGWR'or process='MRP0';
```
&nbsp;

### Information membre dataguard
```sql
set linesize 200
SELECT DATABASE_ROLE, DB_UNIQUE_NAME INSTANCE, OPEN_MODE,
PROTECTION_MODE, PROTECTION_LEVEL, SWITCHOVER_STATUS
FROM V$DATABASE;
```
&nbsp;

### Message du status Dataguard
```sql
set linesize 150
COL "MESSAGE" FORMAT 50
SELECT ERROR_CODE, MESSAGE  FROM V$DATAGUARD_STATUS;
```
&nbsp;

### Vérifier qu'il n'y a aucun GAP
```sql
select * from v$archive_gap;
```
&nbsp;

### Relancer la réplication des archlogs sur la STANDBY
```sql
ARRET
alter database recover managed standby database cancel;

RELANCE
alter database recover managed standby database using current logfile disconnect from session;
```
&nbsp;

### Faire un "switchover" sans broker (primaire puis standby)
```sql
//Sur le PRIMAIRE
alter database commit to switchover to physical standby with session shutdown;
shutdown immediate;
startup nomount;
alter database mount standby database;
alter database recover managed standby database disconnect from session;

//Sur le STANDBY
<code sql>
alter database recover managed standby database cancel;
alter database commit to switchover to primary with session shutdown;
alter database open;
alter system set LOG_ARCHIVE_DEST_STATE_2=ENABLE scope=both;
```
&nbsp;

### Création d'une STANDBY par réplication
Premièrement, créer l'arborescence nécessaire sur la standby (oradata, oraredolog, oraarch, oractl, admin)
puis : 
```sql
rman
connect target sys/change_on_install@black
connect auxiliary sys/change_on_install@white
```
Et enfin, on lance le clonage :
```sql
DUPLICATE TARGET DATABASE
     FOR STANDBY
     FROM ACTIVE DATABASE
     DB_FILE_NAME_CONVERT 'BLACK','WHITE'
     SPFILE
      PARAMETER_VALUE_CONVERT 'BLACK','WHITE'
      SET LOG_FILE_NAME_CONVERT 'BLACK','WHITE'
      SET DB_UNIQUE_NAME 'WHITE';
```

> Ne pas oublier de créer les redologs sur la standby
{.is-warning}

&nbsp;


## FSFO
### Vérifier le status FSFO
Avec SQLPLUS
```sql
set linesize 300
COL "FS_FAILOVER_OBSERVER_HOST" FORMAT A25
SELECT fs_failover_status, fs_failover_current_target,
fs_failover_threshold, fs_failover_observer_present,
fs_failover_observer_host 
FROM v$database;
```
Avec DMGR
```sql
SHOW FAST_START FAILOVER;
```

&nbsp;

### Temps de reconnexion FSFO
> Définit le temps au bout duquel l'observer considère la base primaire KO avant de basculer sur la standby
{.is-info}

==> DMGR
```sql
EDIT CONFIGURATION SET PROPERTY FastStartFailoverThreshold = '120';
```
==> SQLPLUS
```sql
set linesize 200
COL "LAST_FAILOVER_REASON" FORMAT A25
SELECT LAST_FAILOVER_TIME, LAST_FAILOVER_REASON FROM V$FS_FAILOVER_STATS;
```

&nbsp;

## Datafile
### Resize datafile
```sql
alter database datafile '/appli/oracle/SF0NAT/oradata01/SF0NAT_sysaux_01.dbf' resize 2048M;
```

&nbsp;


### Ajout datafile
```sql
alter tablespace XXXX add datafile '/appli/oracle/SF0NAT/oradata01/SF0NAT_sysaux_01.dbf' size 2048M;
```

&nbsp;

## Redolog
### Supprimer les redologs
```sql
alter database drop LOGFILE GROUP XX;
```
&nbsp;

### Informations détaillées sur ls redologs (ONLINE only)
```sql
set linesize 400
COL "MEMBER" FORMAT A80
select l.GROUP#, 
    l.THREAD#, 
    l.SEQUENCE#, 
    l.BYTES, 
    l.MEMBERS, 
    l.STATUS, 
    f.TYPE, 
    f.MEMBER 
from V$LOGFILE f, V$LOG l 
where l.GROUP# = f.GROUP# 
order by GROUP#,MEMBER;
```
&nbsp;

### Infos redologs complet
```sql
select * from v$logfile;
```
&nbsp;

### Status redologs
```sql
set linesize 200
SELECT GROUP#, BYTES, STATUS, 'ONLINE' AS TYPE FROM V$LOG
UNION
SELECT GROUP#, BYTES, STATUS, 'STANDBY' AS TYPE FROM V$STANDBY_LOG
ORDER BY 1;
```
&nbsp;

## Spfile et Controlfile
### Editer un fichier controlfile pour analyse
```sql
ALTER DATABASE BACKUP CONTROLFILE TO TRACE AS '/u01/control.bkp'
```
&nbsp;

### Générer un fichier init ou spfile
```sql
create pfile from spfile='/home/oracle/admin/OPHNAT/dbs/spfile.ora'
create spfile from pfile='/home/oracle/admin/OPHNAT/dbs/pfile.ora'
```
> en cas de perte du paramètre SPFILE, on peux générer un PFILE depuis la mémoire
`create pfile from memory`
{.is-info}

&nbsp;

### Savoir si la base a démarré avec le pfile ou le spfile
```sql
SELECT DECODE(value, NULL, 'PFILE', 'SPFILE') "Init File Type" 
       FROM sys.v_$parameter WHERE name = 'spfile';
```
&nbsp;

## Inclassable
### Générer un rapport AWR
```sql
SQL> @?/rdbms/admin/awrrpt.sql

html ou text
1er param : Nb de rapport à afficher pour sélection ( en jour ) depuis maintenant
2eme param : Snapshot début
3eme param : Snapshot fin
```
&nbsp;

### Supprimer les anciens rapport AWR
```sql
connect / as sysdba 
@?/rdbms/admin/catnoawr.sql 
@?/rdbms/admin/catawrtb.sql 
```
&nbsp;

### Afficher et modifier les paramètres système
```sql
SQL> show parameter
SQL> ALTER SYSTEM SET [Param] = [valeur] | [COMMENT='texte'] [DEFERED] [SCOPE=MEMORY|SPFILE|BOTH];
```

> DEFERED : Si présente, indique que la modification ne concerne que les futures sessions (peut être obligatoire)
	SCOPE : Définit la cible de la modification
	MEMORY:la mémoire seulement 
	SPFILE:le fichier de paramètres serveur seulement 
	BOTH:les deux 
{.is-info}

&nbsp;

### Afficher le dernier reboot de la base
```sql
set pagesize 300
set linesize 300
select to_char(startup_time, 'HH24:MI DD-MON-YY') "Startup time"
from v$instance
```
&nbsp;

### Connaitre les paramètres de langue
```sql
select * from nls_database_parameters where parameter IN (‘NLS_LANGUAGE’,'NLS_TERRITORY’,'NLS_CHARACTERSET’);
```
&nbsp;

### Personnaliser son SQLPLUS
```sql
SET sqlprompt "&_USER@&_CONNECT_IDENTIFIER &_PRIVILEGE> "
```
&nbsp;


### Formater affichage SQLPLUS
```sql
COLUMN <nom_colonne> FORMAT A30;
```
&nbsp;

### Lister les objets invalide
```sql
SET ECHO        OFF
SET HEADING     ON
SET LINESIZE    1800
SET PAGESIZE    50000

COL owner 	FORMAT a25 	HEADING 'Owner'
COL object_name	FORMAT a30	HEADING 'Object Name'
COL object_type	FORMAT a20	HEADING 'Object Type'
COL object_id	FORMAT a20	HEADING 'Object ID'
COL status 	FORMAT a10	HEADING 'Status'

BREAK ON owner SKIP 2 ON report
COMPUTE count LABEL "" OF object_name ON owner

SELECT
    owner
  , object_name
  , object_type
  , status
  , object_id
FROM dba_objects
WHERE status <> 'VALID'
ORDER BY owner, object_name
/
```
&nbsp;


### Status de la registry Oracle (catproc,catlog)
```sql
set pages 1000
set lines 120
col comp_id format a20
col comp_name format a40
col version format a10
col status format a15
select comp_id,comp_name,version,status from dba_registry order by 1;
```
&nbsp;


### Mode d'ouverture de la base (ALLOWED ou RESTRICT)
Au démarrage
```sql
startup restrict
```
Quand la base est OPEN
```sql
alter system enable restricted session;
```
Faire un retour arrière
```sql
alter system disable restricted session;
```
Vérifier le retour à la normal
```sql
SELECT logins from v$instance;
```

&nbsp;


### Connaitre les options oracle activés
A l'installation
```sql
set pagesize 100
set page off
Col parameter format a50 heading "Option"
Col value format a5  heading "Value" justify center wrap
Select parameter, value
from v$option 
order by 2 desc
/
```
A l'utilisation
```sql
Set feedback off
Set linesize 122
Col name             format a45     heading "Feature"
Col version          format a10     heading "Version"
Col detected_usages  format 999,990 heading "Detected|usages"
Col currently_used   format a06     heading "used"
Col first_usage_date format a10     heading "First use"
Col last_usage_date  format a10     heading "Last use"
       select name, version, detected_usages, currently_used,
       to_char(first_usage_date,'DD/MM/YYYY') first_usage_date, 
       to_char(last_usage_date,'DD/MM/YYYY') last_usage_date
from dba_feature_usage_statistics
where name in ('Data Mining','Oracle Database Vault','Label Security') or name like ('OLAP%');
```

&nbsp;


### Afficher les services applicatifs oracle
En tant que DBA
```sql
COL "FAILOVER_METHOD" FORMAT A15
COL "FAILOVER_TYPE" FORMAT A15
COL "NAME" FORMAT A15
COL "EDITION" FORMAT A15
COL "ENABLED" FORMAT A15
COL "DTP" FORMAT A5
select * from dba_services;
```
Sans droits DBA
```sql
COL "NETWORK_NAME" FORMAT A15
select * from v$services; 
```

&nbsp;


### Personnaliser son SQLPLUS
```sql
SET sqlprompt "&_USER@&_CONNECT_IDENTIFIER &_PRIVILEGE> "
```
&nbsp;
