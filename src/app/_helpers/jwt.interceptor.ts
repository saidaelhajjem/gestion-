import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.url !== 'https://api.insee.fr/token') {
            // add authorization header with jwt token if available

            let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2MjQ4NzU2ODIsImV4cCI6MTYyNzQ2NzY4Miwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6ImFsZWFAcmRtYy5mciJ9.TsFv5vWX6CZ5SHvkODdMIPT4PQdqOtJ_NosPB83ibcQStP6_5iGORbKjdeXp3kNISUuJiA6DL9TmiGP7Q-NNiHoX2Z3_81bg18dBzFwrWuNUi-KInwNvY2B4uok-_lPcTbVA6UyxAJSXjvj4mVfPJQLHrD8sXJFAhxwWHEsZifOSSfvDm_DCgidw7ebo3mnYXqWgsKy7v3ir5S1DMnA0IR35hmjE_6rKGTDx8OeAgCXfRdXqtH2_q-gkVuMVCw56EAPzjfGI8S5tKHfJ5eI3iRnXwr46KCisiEEJGMuV77B9Eq4uNw2Y4Uq_jdixu7qxGZgUSkM5j7u0Bri-OEGZc8BVWWpaYQ5u87yUMcJBVgUhZ4v7PfxX5nGE8Has2R6JAW3F1Uw2ncF3q8JZVAQvVAT8VAQ57PCSSmhscN1fkjJUQbEj3rTH8FQEjxSuicmyXrhgMFQDuFmu-WH3LYpZKM2-7KtEP0SqQEEd7k92WMvKZgSOsJag_G5AOC5o-JNW7f-HZqYtuC5p_hkPMpvU7yFkVPDPNMCD6cDOnsLW0D_hMYlaluJj4f4GWqswNzWu51GGNrc32_gsXZeOq0wR9ovvVAEa55iFBP-A1INtQH9OP4ABAmpO_sMLLLVn0_SKD8VFu1SjgZr1xH16Yni1-6HEiGp49f5qqOWfAbalKvo";
            if (token) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${token}`
                    }
                });
            }
        }
        return next.handle(request);
    }
}
