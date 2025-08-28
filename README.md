
# Package Delivery Management System (PDMS)
**Smart, real-time package & driver management with integrated AI assist**

The Package Delivery Management System (PDMS) is an Angular + Express logistics hub that unifies driver and package management in a clean, real-time interface. Secure sessions protect a validated REST API, while AI utilities translate notes, speak licence codes, and generate Gemini distance insights in-app. Fast CRUD, hybrid MongoDB + Firestore storage, and Socket.io responsiveness turn routine fleet admin into a streamlined, data-rich workflow.


---

## Features

- **Authenticated sessions**: Username/password (Firestore) with cookie-based session gating of all CRUD routes.
- **Driver & Package CRUD**: Create, list, update, delete with server-side validation & relational linkage.
- **Strict validation**: Mongoose schema rules (length, format, enums, positivity) + client form checks.
- **Real-time AI tools** (Socket.io):
	- Translation (Google Cloud Translate)
	- Text-to-Speech to MP3 (Google Cloud TTS)
	- Distance insight (Gemini) for Melbourne -> destination
- **Operations stats**: Aggregated metrics served from Firestore.
- **Protected routing**: Angular AuthGuard + fallback screens.
- **Utility pipes**: Weight, date, uppercase, language formatting for consistent UI.
- **Extensible architecture**: Clean separation (models/controllers/routes/middleware) accelerates new endpoints & AI utilities.

---

## Architecture Overview

| Layer | Responsibilities | Key Tech |
|-------|------------------|----------|
| Client (Angular) | UI, routing, form input, session state, pipes | Angular 18 (standalone components), RxJS, HttpClient |
| REST API | CRUD for drivers, packages, users, stats | Express, Mongoose, Firestore, express-session |
| Realtime | Non-CRUD AI utilities (translation, TTS, distance) | Socket.io |
| Persistence | Operational data vs credentials/stats | MongoDB (drivers/packages), Firestore (users/stats) |
| AI Services | NLP / speech / generation | Google Cloud Translate, Text-to-Speech, Gemini |

---

## RESTful API Design (v1)
Base path: `/api/v1`

| Resource | Method | Endpoint | Purpose |
|----------|--------|----------|---------|
| Drivers | GET | `/drivers` | List drivers |
| Drivers | POST | `/drivers/add` | Create driver |
| Drivers | PUT | `/drivers/update` | Update licence/department |
| Drivers | DELETE | `/drivers/delete?_id=<id>` | Delete driver |
| Packages | GET | `/packages` | List packages |
| Packages | POST | `/packages/add` | Create package |
| Packages | PUT | `/packages/update` | Update destination |
| Packages | DELETE | `/packages/delete/<id>` | Delete package |
| Users | POST | `/users/login` | Login (sets session) |
| Users | POST | `/users/signup` | Create account |
| Users | GET | `/users/signout` | Destroy session |
| Users | GET | `/users/login/check` | Auth status |
| Stats | GET | `/users/stats` | Aggregate operations (auth required) |

All protected endpoints enforce session authentication via `sessionAuthenticationAPI` middleware.

### Sample: Create Driver

Request
```
POST /api/v1/drivers/add
Content-Type: application/json
Cookie: connect.sid=...

{
	"name": "John Doe",
	"department": "Food",
	"licence": "AB123",
	"isActive": true
}
```

Success Response (200)
```json
{
	"status": "Driver added successfully",
	"driver": { "_id": "...", "driverID": "D42-33-XYZ", "name": "John Doe", ... }
}
```

Error (400)
```json
{ "status": "Validation failed", "message": "Licence must be 5-character-long and alphanumeric." }
```

---

## Realtime AI Channels

| Event | Direction | Payload (req) | Payload (resp) | Service |
|-------|-----------|---------------|----------------|---------|
| `translateRequest` | client -> server | `{ text, target }` | `{ translation, text, target }` | Google Translate |
| `ttsRequest` | client -> server | `"STRING"` (text) | `"assets/<file>.mp3"` | Google TTS |
| `genaiRequest` | client -> server | `"DestinationCity"` | `"The distance between Melbourne and ..."` | Gemini |

---

## Tech Stack

- **Frontend**: Angular 18 (standalone), RxJS, TypeScript
- **Backend**: Node.js, Express, Socket.io
- **Data**: MongoDB (Mongoose), Firestore
- **Auth**: express-session (cookie, server-side session store)
- **AI / Cloud**: Google Cloud Translate, Text-to-Speech, Gemini (Generative AI)
- **Tooling**: Angular CLI, TypeScript, npm

---

## Local Development

Prerequisites: Node.js (LTS), MongoDB running locally, Google Cloud credentials (Translate + TTS), Gemini API key.

1. Clone & install
```bash
git clone <repo-url>
cd pdms
npm install
```
2. Install backend deps (if separated) - already included if root package.json manages both.
3. Start MongoDB (default localhost:27017).
4. Set environment variables (recommended):
```bash
export GEMINI_API_KEY="<your-key>"
export GOOGLE_APPLICATION_CREDENTIALS="/abs/path/service-account.json"
```
5. Run backend (from `backend/` if separate):
```bash
node server.js
```
6. Run frontend:
```bash
ng serve
```
7. Visit: http://localhost:4200

---

## Validation & Integrity
- Mongoose schemas enforce string formats, enumerated departments, length constraints, positive numbers.
- Generated human-readable IDs help debugging (`D##-33-XXX`, `PXX-HT-###`).
- Dual validation: client-side form guard + server authoritative checks.

---

## Testing (Suggested Enhancements)
Add unit tests for:
- Controller success & failure paths
- Middleware auth rejection
- Schema validation edge cases
- Socket event handlers (using a Socket.io test client)

---

## Future Improvements
- Role-based access control (admin vs operator)
- Pagination & filtering on list endpoints
- Rate limiting on AI socket events
- Centralized error formatter & logging (winston / pino)
- OpenAPI (Swagger) spec & auto-generated docs
- Docker Compose (API + MongoDB + Angular build)

---

## Attribution
Built with Angular CLI 18.2.4 and Node.js/Express. Google Cloud services used for translation, synthesis & generative responses.

---

## Summary
PDMS showcases disciplined REST API engineering, real-time AI augmentation, and a clean Angular frontend - turning basic logistics CRUD into an intelligent operations layer.

