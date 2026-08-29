package com.factorymaintenance.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.http.HttpMethod;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {


    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter
    ) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

// ==========================================
// PASSWORD ENCODER
// ==========================================

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

// ==========================================
// SECURITY CONFIGURATION
// ==========================================

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http
                // Disable CSRF for REST API
                .csrf(csrf -> csrf.disable())

                // JWT authentication = stateless
                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                // ==========================================
                // API AUTHORIZATION
                // ==========================================

                .authorizeHttpRequests(auth -> auth

                        // ----------------------------------
                        // AUTHENTICATION
                        // Login + Register are public
                        // ----------------------------------

                        .requestMatchers("/api/auth/**")
                        .permitAll()


                        // ==================================
                        // MACHINE MANAGEMENT
                        // ==================================

                        // Create machine - ADMIN only
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/machines"
                        )
                        .hasRole("ADMIN")

                        // Update machine - ADMIN only
                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/machines/**"
                        )
                        .hasRole("ADMIN")

                        // Delete machine - ADMIN only
                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/machines/**"
                        )
                        .hasRole("ADMIN")

                        // View machines - ADMIN + TECHNICIAN
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/machines/**"
                        )
                        .hasAnyRole(
                                "ADMIN",
                                "TECHNICIAN"
                        )


                        // ==================================
                        // MAINTENANCE MANAGEMENT
                        // ==================================

                        // Create maintenance - ADMIN only
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/maintenance"
                        )
                        .hasRole("ADMIN")

                        // Delete maintenance - ADMIN only
                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/maintenance/**"
                        )
                        .hasRole("ADMIN")

                        // View maintenance - ADMIN + TECHNICIAN
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/maintenance/**"
                        )
                        .hasAnyRole(
                                "ADMIN",
                                "TECHNICIAN"
                        )

                        // Update maintenance
                        // ADMIN + TECHNICIAN
                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/maintenance/**"
                        )
                        .hasAnyRole(
                                "ADMIN",
                                "TECHNICIAN"
                        )


                        // ==================================
                        // ALL OTHER APIs
                        // ==================================

                        .anyRequest()
                        .authenticated()
                )

                // ==========================================
                // JWT FILTER
                // ==========================================

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }


}
