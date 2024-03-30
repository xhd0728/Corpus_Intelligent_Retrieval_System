# Introduction

This project is a corpus intelligent retrieval system implemented in the previous backend approach. We have implemented data management and permission management for the corpus.

# Start

Before running the project, you need to prepare necessary environment:

- Make sure `MySQL` and `Redis` are installed.
- Configure the db server in `server/config/database.py`.
- Configure the JWT in `server/config/jwt.py`
- Make sure the following configurations are the same:
    - `baseURL` in `server/config/addr.py`
    - `baseURL` in `client/src/api/index.js`
    - `baseURL` in `client/src/globle/globleApi.js`

## Server

```shell
cd server
pip install -r ./requirements.txt
python ./manage.py migrate
python ./manage.py runserver 8000
```

## Client

```shell
npm install
npm run serve
```

# Contact

If you have any questions about this project, please contact:

```
hdxin2002@gmail.com
```

# Citation

If this project is helpful to you, please cite it in your paper:

```bibtex
@software{Corpus_Intelligent_Retrieval_System,
  author = {Haidong Xin and Fang Wu and Xiaojun Ye and Xianyu Zhang and Jingbo Sun},
  title = {{Corpus_Intelligent_Retrieval_System}},
  url = {https://github.com/xhd0728/Corpus_Intelligent_Retrieval_System},
  version = {1.0},
  year = {2024}
}
```