use actix_service::ServiceFactory;
use actix_web::body::BoxBody;
use actix_web::dev::ServiceRequest;
use actix_web::dev::ServiceResponse;
use actix_web::Error;
use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};

#[get("/")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().body("Hello world!")
}

#[post("/echo")]
async fn echo(req_body: String) -> impl Responder {
    HttpResponse::Ok().body(req_body)
}

async fn manual_hello() -> impl Responder {
    HttpResponse::Ok().body("Hey there!")
}

fn get_app() -> App<
    impl ServiceFactory<
        ServiceRequest,
        Response = ServiceResponse<BoxBody>,
        Config = (),
        InitError = (),
        Error = Error,
    >,
> {
    App::new().configure(app_config)
}

fn app_config(config: &mut web::ServiceConfig) {
    config.service(
        web::scope("")
            // .app_data(web::Data::new(AppState {
            //     foo: "bar".to_string(),
            // }))
            .service(hello)
            .service(echo)
            .route("/hey", web::get().to(manual_hello)),
    );
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| get_app())
        .bind(("127.0.0.1", 8080))?
        .run()
        .await
}
#[cfg(test)]
mod tests {
    use actix_web::{
        body::to_bytes,
        dev::{Service, ServiceResponse},
        http::StatusCode,
        test,
    };

    use super::*;

    #[actix_web::test]
    async fn test_index_get() {
        let app = test::init_service(get_app()).await;

        // Create request object
        let req = test::TestRequest::with_uri("/").to_request();

        // Call application
        let res = test::call_service(&app, req).await;
        assert_eq!(res.status(), StatusCode::OK);
    }

    #[actix_web::test]
    async fn test_echo_post() {
        let app = test::init_service(get_app()).await;

        // Create request object
        let req = test::TestRequest::post()
            .uri("/echo")
            .set_payload("Echo echo echo")
            .to_request();

        // Call application
        let resp: ServiceResponse = app.call(req).await.unwrap();
        assert_eq!(resp.status(), StatusCode::OK);
        assert!(resp.status().is_success());
        let body = to_bytes(resp.into_body()).await.unwrap();
        assert_eq!(
            body,
            web::Bytes::from_static(b"Echo echo echo")
        );
    }

    #[actix_web::test]
    async fn test_manual_hello_get() {
        let app = test::init_service(get_app()).await;

        // Create request object
        let req = test::TestRequest::with_uri("/hey").to_request();

        // Call application
        let res = test::call_service(&app, req).await;
        assert_eq!(res.status(), StatusCode::OK);
    }
}
