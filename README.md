#Proposed Work

#Problem Statement

A lot of road accidents happen in India, daily. According to the data from 2021 published by NCRB, Overspeeding is responsible for 58.7% of all accidents, while reckless or careless driving and overtaking accounted for 25.7%. Over-speeding constituted the paramount traffic rule violation associated with accident-related deaths (69.3%) and injuries (73.4%). From all this data it is clear that overspeeding is a real problem and a major cause for concern. It is important for road safety to reduce overspeeding-related accidents in the interest of human life and property. 

High-speed vehicles will have a bigger impact during collisions and cause more injuries. Driving faster reduces one's capacity to assess forthcoming events, which leads to errors in judgement and ultimately to crashes. Simply put, an overspeeding vehicle gives other forthcoming vehicles very less time to react and it becomes extremely difficult to avoid a collision. This is how accidents happen due to overspeeding.


#Proposed Solution

Making nearby vehicles aware of overspeeding and reckless vehicles will be a huge step forward in terms of avoiding these accidents. Other vehicles can then take precautionary actions and this can make the difference between life and death. This is especially true for long expressways and sharp turns. At sharp turns, and on long highways in foggy weather,  it becomes impossible to know when an overspeeding vehicle may be coming close. In such situations alerting nearby vehicles of a possible danger can be immensely beneficial. Also, if the nearby infrastructures or checkpoints can be made aware of such vehicles, catching the rogue driver and stopping the vehicle at such checkpoint will also be easier. And only then can further action be taken and a possible accident could be prevented.

The solution to this and to many other road safety issues is to eventually move towards the Internet of Vehicles (IoV). This means gradually replacing the existing vehicles with IoV. The driving experience will undergo a significant transformation thanks to the internet of vehicles. It will be
safer than ever owing to the development of smart city infrastructure and its connectivity with our vehicles through the IoV.

Now the information that is shared by the IoV needs to be secured and trustworthy. This is where Blockchain comes in. Blockchain makes the whole process of sharing the location of the overspeeding vehicle secure and with added features like traceability. Because of Blockchain, we can rest assured that the system is tamper-proof and reliable. 

Let's assume that a vehicle is overspeeding and/or recklessly driving. Our aim is to notify and alert other vehicles nearby about the presence of a rogue vehicle so that they can be more aware of the situation and avoid any possible accident or actively take necessary steps to be on the safer side such as making sure that they have seat belts tied on, or slowing down their vehicle, or stopping the vehicle completely. We also want to make sure that the overspeeding vehicle is caught as soon as possible, thus we also aim to notify nearby checkpoints or Toll Naka where the vehicle can be caught and further legal and precautionary actions can be taken.

Our proposed model (Shown in Fig. 2) for dealing with overspeeding vehicles using Blockchain assisted IoV can be primarily divided into three sections:
●	Detecting a vehicle is overspeeding
●	Making entries into the public ledger with information about the overspeeding vehicle.
●	Alert mechanism, that works with the help of smart contracts of Blockchain.


 
Diagram showing the working of the proposed model

#Detection

The process of this alert and stopping of overspeeding starts with actually detecting a vehicle is overspeeding. For this, we can use the speedometer sensor reading of the vehicle or the GPS of the vehicle to detect movement speed or a combination of both for increased reliability. This means that every IoV needs to have a GPS sensor on board. The speedometer is already present on vehicles, we just need to process this data by the software onboard on the IoV. If the speed is above a particular threshold of safe speed then the system will flag this vehicle as overspeeding and entries about this vehicle will be made to the public ledger using Blockchain. 

#Sharing Information/Making Entries

Now, if we detect that a particular vehicle is overspeeding and/or reckless driving (here Vehicle-A), this information will be further processed for the alert mechanism to work. This complete transaction of essential information about the over-speeding vehicle will happen through Blockchain.
The information about the overspeeding vehicle will be uploaded in the form of a block. This information may contain identification info about the vehicle such as the registration number, and also the latitude & longitudinal information to locate the vehicle and alert nearby vehicles based on this location. Now, as per the fundamental features of Blockchain, this block of data uploaded works like a public ledger, where any node can access/view the information and can verify the authenticity of the data. This is how the information is shared. This data is immutable and traceable along with all other features that come with exchanging information through Blockchain. Also, this ledger is distributed, i.e, a copy of this ledger is made available to all the nodes participating in this transaction. Thus adding more layers to its security. 

#Alert Mechanism

 The alert mechanism is done automatically through the smart contract. This is yet another feature of Blockchain. This works on the basis of logic that if a new block of data is added to the Blockchain, nodes that are essentially IoVs, that are within a particular radius (let's take that to be 500 metres) get the alert that an overspeeding vehicle may be approaching. So, in the above diagram, Vehicle-B and Vehicle-C would be alerted about the existence of the overspeeding vehicle, Vehicle-A in the nearby vicinity. This alert location & zone can be calculated by the latitude and longitudinal value of the overspeeding vehicle. The smart contract contains this piece of logic and thus this executes automatically according to the terms of the agreement between the IoVs. We also aim to inform the traffic infrastructure or administrative infrastructure such as the nearest checkpoints (or Toll Nakas), in the same way about the overspeeding vehicle so that they can be caught and stopped from causing further harm. After the vehicle is caught, further legal and precautionary actions can be taken.





#Flowchart

The algorithm of this complete process from detection of a overspeeding vehicle to alert system and eventually catching the overspeeding vehicle is represented in the form of a flowchart in Fig. 3 given as follows:

 

Flowchart showing the complete working process of the proposed model
#Blockchain Node Network For Proposed Model

The Nodes are the core of the Blockchain structure. The Nodes participate in the Blockchain network and thus validate the data transactions that happen on the network. This is what makes the Blockchain Network decentralized and secure. The Node network for our proposed model is shown in Fig. 4.
 
Node Network of Proposed model


The Nodes in this proposed model are:
● Vehicles (IoV)
● Traffic Infrastructure
● Regional Transport Office

These Nodes in the proposed model are all essential parts of the Blockchain. The Blockchain by virtue act as a distributed ledger, thus the same information is synchronized across most of the nodes, i.e, most nodes get a copy of the same ledger. However, all the Nodes do not need to keep a copy of all the transactions, such as the Vehicle Node. These nodes are termed Light Nodes according to Blockchain terminology. When a Block is added to the Blockchain, all the Nodes can access that Block of data through the cloud. Interplanetary file system (IPFS) is the file-sharing protocol that uses peer-to-peer networks to facilitate media file transfer in distributed systems. Here, IPFS servers are used to store large data files and the Blockchain contains only the logs of the transactions. The distributed ledger, i.e, the Blockchain is accessible from each node in the cloud through the Central Information Centre. Each Block of the Blockchain contains the essential data required for the identification and alert mechanism to work. Each Block also contains the previous hash, thus forming the chain of Block, i.e, Blockchain.

When a vehicle over speeds, it logs the data using RSUs through the cloud into the Central Information Centre, as denoted by the directional arrows 1 & 2. The Central Information Centre verifies and processes the data to determine that the vehicle is indeed speeding and then sends data back to other vehicles for the alert mechanism to work, as denoted by arrows 3 & 4. The data is also sent back to nearby Infrastructures such as Checkpoint and then eventually RTOs to take necessary action based on this. This is denoted by arrows 5 & 6. 
