# Bitcoin mining project

In this project you should run multiple experiments, that will help us better understand the proof of work function and mining.
In this project, you should use go and extend the code you created for the labs.

## 1: Local mining experiment

In the first part, you are supposed to run multiple experiments on a single machine.

### a) Block delay

* Create at least 2000 blocks using the PoW function from Lab 3.
* Collect information, how long the mining takes. 
* Create a graph showing the distribution of the block delay in your experiment, including mean and median.
* Does the mean time among the first 1000 blocks and the second 1000 blocks vary?

### b) Difficulty adjustment

* Repeat the experiment from a) twice with a different difficulty.
* Compare the change in difficulty with the changes in average block delay.

### c) CPU and hardware change

* Repeat the experiment from a) with on a different computer. 
* How does the block delay change?

You can use the machines in the unix lab (pitter) for this task.

### c) Multithreading

* Extend the prototype, so that multiple goroutines try to solve the PoW. 
* How does using multiple goroutines affect the block delay?

## 2: Networked mining

In this part, you should extend the lab with networking capacities.

The goal is to be able to run 2 miners or nodes looking for a PoW. 
If one of them finds a solution it is forwarded to the other.

You may skip validation of blocks submitted by the other miner and youre code does not need to be able to handle forks.

You should run at least 2 experiments:
1. Mine at least 1000 blocks on the both miners. Which miner winns more often?
2. Use a different number of goroutines for mining on the different miners. How does that affect the ratio of blocks that miners receive?

## 3: Report

Write a report presenting the results from your experiments using Charts.
You should also explain what would have to be added to your code, to implement validation of blocks and to support forks.