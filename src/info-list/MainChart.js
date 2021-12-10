import React from 'react';
import Web3 from 'web3'
import { Table, Button, Image, Divider, Tag, message, notification } from 'antd';

import { HERO_MAPPING, NEED_TO_UPGRADE_EXP } from '../tools/FormatHero'

import ABI from '../configs/ABI'
import CONTRACT from '../configs/contract.json'
import RPC from '../configs/RPC.json'
import ACCOUNTS from '../configs/accounts888.json'

const web3 = new Web3(new Web3(RPC.BSC).currentProvider);

class MainChart extends React.Component {

  contract = new web3.eth.Contract( ABI, CONTRACT.address );

  monster = web3.eth.abi.encodeParameter('uint256', 5);

  state = {
    datas: ACCOUNTS.map(privateKey => {
      return{
      address: web3.eth.accounts.privateKeyToAccount(privateKey).address,
      privateKey,
    }}),
  };

  componentDidMount = () => {
    this.getBalances();
    this.getHeroes();
  }

  getHeroes = () => {
    this.state.datas.map(account => {
      this.contract.methods.getHeroesByOwner(account.address, true).call().then(heroes => {
        if (heroes && heroes.length) {
          heroes.map((hero, index) => {
            const mappedHero = {};
            for (var i = 0; i < 10; i++) {
              mappedHero[HERO_MAPPING[i]] = hero[i];
            }
            account[`hero${index + 1}`] = mappedHero;
          });
        }
      });
    })
  }

  getBalances = () => {
    this.state.datas.map(account => {
      this.contract.methods.balances(account.address).call().then(balances => {
        account.balances = balances;
      });
    });
  }

  refreshAddress = (address) => {

  }

  fight = (hero, account) => {
    if (account.privateKey) {
      message.loading('TX sending!')
      web3.eth.accounts.wallet.add(account.privateKey);
      const fighter = web3.eth.abi.encodeParameter('uint256', hero.id);
      this.contract.methods
                .fight(fighter, this.monster)
                .send({from: account.address,
                    gas: 238444,
                    gasPrice: web3.utils.toWei(RPC.maxGwei, "gwei"),
                })
                .on('sent', () => {
                    console.log('Claim transaction submitted...')
                }).on('transactionHash', (hash) => {
                  const infos = {
                    message: 'TX Details',
                    description: `https://bscscan.com/tx/${hash}`,
                    duration: 3,
                  }
                  notification.open(infos)
                }).on('receipt', (receipt) => {
                    message.success('Done!');
                    console.log(`Done!`)
                })
                .catch((error) => {
                    console.log('Error', error)
                });
    } else {
      console.log(web3.eth.getGasPrice().then(result => {
        console.log(result);
      }));
      message.info('NO Private KEY!')
    }
  }

  upgrade = (hero, account) => {
    if (account.privateKey) {
      message.loading('TX sending!')
      web3.eth.accounts.wallet.add(account.privateKey);
      const fighter = web3.eth.abi.encodeParameter('uint256', hero.id);
      this.contract.methods
                .unLockLevel(fighter)
                .send({from: account.address,
                    gas: 238444,
                    gasPrice: web3.utils.toWei(RPC.maxGwei, "gwei"),
                })
                .on('sent', () => {
                    console.log('Claim transaction submitted...')
                }).on('transactionHash', (hash) => {
                  const infos = {
                    message: 'TX Details',
                    description: `https://bscscan.com/tx/${hash}`,
                    duration: 3,
                  }
                  notification.open(infos)
                }).on('receipt', (receipt) => {
                    message.success('Done!');
                    console.log(`Done!`)
                })
                .catch((error) => {
                    console.log('Error', error)
                });
              }
  }

  setupColumn = [
    { "title": "Address", "dataIndex": "address", render: (address) => (
      <>
        <div style={{wordWrap: 'break-word', wordBreak: 'break-word'}}>{address}</div>
        <Divider/>
        <Button shape='round' onClick={() => this.refreshAddress(address)}>🐼</Button>
      </>)},
    { "title": "Rewards", "dataIndex": "balances", render: (balances) => (
      <>
        <Tag color='gold'>{`${balances / Math.pow(10, 18).toFixed(3)} BNB`}</Tag>
      </>
    )},
    { "title": "Bitch 1", "dataIndex": "hero1", render: (hero, account) => this.renderHero(hero, account) },
    { "title": "Bitch 2", "dataIndex": "hero2", render: (hero, account) => this.renderHero(hero, account) },
    { "title": "Bitch 3", "dataIndex": "hero3", render: (hero, account) => this.renderHero(hero, account) },
    { "title": "Bitch 4", "dataIndex": "hero4", render: (hero, account) => this.renderHero(hero, account) },
    { "title": "Bitch 5", "dataIndex": "hero5", render: (hero, account) => this.renderHero(hero, account) }
  ]

  renderHero = (hero, account) => {
    const needToUpgrade = hero && NEED_TO_UPGRADE_EXP.includes(parseInt(hero.exp));
    let HPColor = 'default';
    if (hero && parseInt(hero.hp) >= 200 ) HPColor = 'gold';
    if (hero && parseInt(hero.hp) >= 800 ) HPColor = 'magenta';
    return (
    hero &&
    <>
      <Image src={`https://play.bnbheroes.io/cards/${hero[0]}.png`}  width={100}/>
      <Divider/>
      <Tag color={HPColor}>{`HP ${hero.hp}`}</Tag>
      <Tag color='lime'>{`Exp. ${hero.exp}`}</Tag>
      <Tag color='cyan'>{`ID ${hero.id}`}</Tag>
      <Tag color='geekblue'>{`Level ${hero.level}`}</Tag>
      <Divider/>
      <Button disabled={parseInt(hero.hp) < 200} onClick={() => this.fight(hero, account)}>FUCK</Button>
      <Button
        danger={needToUpgrade}
        disabled={!needToUpgrade}
        type={needToUpgrade ? 'primary' : 'default'}
        onClick={() => this.upgrade(hero, account)}
      >🤘🏿🤘🏿🤘🏿</Button>
    </>
  )}

  render() {
    return <Table dataSource={this.state.datas} columns={this.setupColumn}  pagination={false}/>;
  }
}

export default MainChart;