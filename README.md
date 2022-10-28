# community_service
## 프로젝트 개요
<b>커뮤니티 서비스 형태의 Rest Api입니다.</b>

> 자유, 공지사항, 운영 게시판이 있으며 <br>
> 회원 등급의 권한 별로 조회,수정,작성,삭제가 가능합니다.(등급 : User / Admin) <br>
> 유저 성별, 시간대별 유저 접속, 게시판 작성 비율 등 여러가지의 통계 기능이 있습니다.(Admin만 사용 가능)

## 기술 스택
- Framework: express
- ORM : prisma
- DB : mysql

## DB Modeling
![image](https://user-images.githubusercontent.com/55984573/198518910-64d8373e-6a68-4a93-a499-003ce7ab5bff.png)

- user(PK:id) - board(FK:user_id) : 1 - N
- user(PK:id) - comment(FK:user_id) : 1 - N
- user(PK:id) - visit_log(FK:user_id) : 1 - N 
- board(PK:id) - comment(FK:board_id) : 1 - N
제약조건: board 삭제 시 댓글 삭제

```
확장성을 위해 Board Table이 모든 게시판을 담당하고 댓글 기능을 위해서 Comment Table을 구성하였습니다.
User의 방문 기록을 통해서 User의 접속 시간대 통계를 내기 위해서 visit_log Table을 추가하였습니다.
유저 로그인 시 로그가 남게 됩니다.
```

## API 문서
자세한 내용은 Docs 참조
| 기능구분  | 기능  | Method | URL | header token 여부 |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| User | 회원가입 | POST | /user/register  |                 
|  | 로그인  | POST | /user/login  | 
|  | 탈퇴  | PATCH  | /user/withdraw  | true |
| Board | 자유게시판 글 목록  | GET  | /board/free  | 
|  | 공지사항 글 목록  | GET  | /board/notice  |
|  | 운영게시판 글 목록 | GET  | /board/operation | true |
|  | 자유게시판 글 상세  | GET  | /board/free/:id  |
|  | 공지사항 글 상세  | GET  | /board/notice/:id |
|  | 운영게시판 글 상세  | GET  | /board/operation/:id | true |
|  | 글 작성  | POST  | /board/post | true |
|  | 글 수정  | PATCH  | /board/post/:id | true |
|  | 글 삭제  | DELETE  | /board/post/:id | true |
| Comment | 댓글 목록  | GET  | /comment/post?boardId={value}  | 
|  | 댓글 작성  | POST  | /comment/post?boardId=value  | true |
|  | 댓글 수정  | PATCH  | /comment/post?boardId=value  | true |
|  | 댓글 삭제  | DELETE  | /comment/post?boardId=value  | true |
| 통계 | 성별  | GET  | /statistics/gender  | true |
|  | 나이  | GET  | /statistics/age  | true |
|  | 접속시간 | GET  | /statistics/accesstime  | true |
|  | 방문횟수 | GET  | /statistics/visit  | true |

## 구현 기능 관련
<b>게시판 별 접근 권한</b>
- 공지사항
    - User : 조회
    - Admin : 조회 / 작성 / 수정 / 삭제
        - 수정 / 삭제는 작성자만 가능
- 자유 게시판
    - User : 조회 / 작성 / 수정 / 삭제
    - Admin : 조회 / 작성 / 수정 / 삭제
        - 수정 / 삭제는 작성자만 가능
- 운영 게시판
    - User : X
    - Admin : 조회 / 작성 / 수정 / 삭제
        - 수정 / 삭제는 작성자만 가능 
        
> 댓글 접근 권한도 게시판과 동일합니다.

<b>통계 기능</b>
 - 성별
    - 자유 게시판 작성 게시글 기준 User 성별 비율
    - User 성별 수
    - User 성별 비율  
 - 나이
    - User 연령대 비율                        
    - 연령대 별 User 수
    - 자유 게시판 작성 게시글 기준 User 연령대 비율
 - 접속 시간
    - 접속 시간 별 User 전체 수
    - 접속 시간 별 User 연령대 비율
    - 접속 시간 별 User 성별 비율
 - 방문 횟수
    - 커뮤니티 전체 방문 수
    - 성별 간 전체 방문 수
    - 연령대 별 전체 방문 수
> 접근 권한은 모두 Admin 계정만 가능합니다.

## 설치 및 실행 방법
nodejs와 npm이 install 되어있지 않다면 먼저 install 과정 진행
<details>
    <summary> 프로젝트 설치 밀 실행 과정</summary>

<b>1. 프로젝트 clone 및 디렉토리 이동</b>
```bash
git clone https://github.com/PreOnboarding-Team-F/community_service.git
cd community_service
```
<b>2. .env 파일 생성</b>
```bash
DATABASE_URL=mysql://{사용자}:{비밀번호}@{db주소 및 포트번호}/{db 이름}
SECRET_KEY=임시값 생성
```
<b>3. node package 설치</b>
```javascript
npm install
```
<b>4. 서버 실행</b>
```javascript
npm start
```
</details>

<details>
    <summary>Test 실행 방법</summary>
    
<b>1. .env.test 파일 생성</b>
```bash
DATABASE_URL=mysql://{사용자}:{비밀번호}@{db주소 및 포트번호}/{db 이름}
SECRET_KEY=임시값 생성
```
<b>2. test 실행</b>
```javascript
npm run test
```
</details>
