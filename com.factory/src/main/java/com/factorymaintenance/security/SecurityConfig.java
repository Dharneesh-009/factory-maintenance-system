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

                        // ==================================
                        // AUTHENTICATION
                        // ==================================

                        .requestMatchers("/api/auth/**")
                        .permitAll()


                        // ==================================
                        // MACHINE MANAGEMENT
                        // ==================================

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/machines"
                        )
                        .hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/machines/**"
                        )
                        .hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/machines/**"
                        )
                        .hasRole("ADMIN")

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

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/maintenance"
                        )
                        .hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/maintenance/**"
                        )
                        .hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/maintenance/**"
                        )
                        .hasAnyRole(
                                "ADMIN",
                                "TECHNICIAN"
                        )

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/maintenance/**"
                        )
                        .hasAnyRole(
                                "ADMIN",
                                "TECHNICIAN"
                        )


                        // ==================================
                        // BREAKDOWN MANAGEMENT
                        // ==================================

                        // Create breakdown
                        // ADMIN + TECHNICIAN
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/breakdowns"
                        )
                        .hasAnyRole(
                                "ADMIN",
                                "TECHNICIAN"
                        )

                        // Delete breakdown
                        // ADMIN ONLY
                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/breakdowns/**"
                        )
                        .hasRole("ADMIN")

                        // View breakdowns
                        // ADMIN + TECHNICIAN
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/breakdowns/**"
                        )
                        .hasAnyRole(
                                "ADMIN",
                                "TECHNICIAN"
                        )

                        // Update breakdown
                        // ADMIN + TECHNICIAN
                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/breakdowns/**"
                        )
                        .hasAnyRole(
                                "ADMIN",
                                "TECHNICIAN"
                        )

// ==================================
// SPARE PARTS INVENTORY
// ==================================

// Create spare part - ADMIN ONLY
                                .requestMatchers(
                                        HttpMethod.POST,
                                        "/api/spare-parts"
                                )
                                .hasRole("ADMIN")

// Update spare part - ADMIN ONLY
                                .requestMatchers(
                                        HttpMethod.PUT,
                                        "/api/spare-parts/**"
                                )
                                .hasRole("ADMIN")

// Delete spare part - ADMIN ONLY
                                .requestMatchers(
                                        HttpMethod.DELETE,
                                        "/api/spare-parts/**"
                                )
                                .hasRole("ADMIN")

// View spare parts - ADMIN + TECHNICIAN
                                .requestMatchers(
                                        HttpMethod.GET,
                                        "/api/spare-parts/**"
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