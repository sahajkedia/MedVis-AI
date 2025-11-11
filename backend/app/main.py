from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers import health


def create_app() -> FastAPI:
    app = FastAPI(title="MedVis AI API")

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:3000"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(health.router, prefix="/api")

    @app.get("/")
    def root():
        return {"service": "medvis-ai-api", "status": "ok"}

    return app


app = create_app()


