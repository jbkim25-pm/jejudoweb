# 제주도 여행 가이드 실행 안내

## 1. Windows PC에 소스 저장하기

관리 화면의 **Code** 탭에서 **Download as ZIP**을 눌러 소스를 내려받습니다. 압축을 푼 뒤, 폴더 전체가 다음 위치가 되도록 배치합니다.

```text
D:\claude\jejudoweb
```

프로젝트 폴더 안에는 `package.json`, `client`, `server` 폴더가 바로 보여야 합니다. 한 단계 더 중첩된 폴더 구조가 되지 않도록 확인합니다.

## 2. 사전 준비

Windows에 **Node.js 22 LTS 이상**과 `pnpm`을 설치합니다.

```powershell
node --version
npm install -g pnpm
pnpm --version
```

## 3. 개발 서버 실행

PowerShell을 열고 아래 순서로 실행합니다.

```powershell
cd D:\claude\jejudoweb
pnpm install
pnpm dev
```

콘솔에 표시되는 주소(일반적으로 `http://localhost:3000`)를 브라우저에서 엽니다. 모바일 화면은 Chrome 개발자 도구의 기기 모드에서 확인할 수 있습니다.

## 4. 배포용 빌드 확인

아래 명령으로 TypeScript 검사와 정적 빌드를 수행할 수 있습니다.

```powershell
pnpm check
pnpm build
```

## 5. GitHub `jejudoweb` 저장소 반영

가장 간단한 방법은 관리 화면의 **Settings → GitHub**에서 저장소 내보내기를 선택하고, 저장소 이름으로 `jejudoweb`을 지정하는 것입니다. GitHub 계정 연결이 필요한 경우 화면 안내에 따라 인증합니다.

PowerShell로 직접 올릴 수도 있습니다. GitHub에서 먼저 빈 `jejudoweb` 저장소를 만든 뒤 아래 명령을 실행합니다. 이미 `origin` 원격 저장소가 등록된 경우에는 `git remote add origin ...` 대신 `git remote set-url origin ...`을 사용합니다.

GitHub CLI를 사용하거나 GitHub Desktop에서 저장소를 연동합니다. 이미 원격 저장소가 존재하는 경우에는 주소를 본인 계정의 주소로 바꿔 실행합니다.

```powershell
cd D:\claude\jejudoweb
git init
git add .
git commit -m "Create Jeju coastal atlas travel guide"
git branch -M main
git remote add origin https://github.com/<GitHub-사용자명>/jejudoweb.git
git push -u origin main
```

GitHub에서 `jejudoweb` 저장소를 먼저 만들지 않았다면, GitHub 웹사이트에서 새 저장소를 만든 후 위 명령의 `<GitHub-사용자명>`을 본인 계정명으로 교체합니다.

## 구현 범위

이 웹사이트는 첨부 일정표의 5일 일정, 총 33개 방문·이동 항목을 담았습니다. 모든 장소 카드는 관련 여행 이미지와 카카오맵·구글 지도 검색 링크를 가지며, 항공편 탑승 항목만 지도 링크가 없습니다. 날짜별 제주 북부 예보는 페이지를 열 때 공개 기상 API에서 갱신되며, 제공 기간 밖인 경우에는 예보 확인 링크가 표시됩니다. 운전 시간은 계획용 참고값이므로 실제 출발 전 지도 서비스의 교통 정보를 다시 확인합니다. 숙소 카드에는 예약 상태를 표시하지 않습니다.
